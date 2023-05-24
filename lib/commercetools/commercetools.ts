const getToken = async () => {
  const bodyParams = new URLSearchParams();
  bodyParams.append('grant_type', 'client_credentials');
  bodyParams.append('scope', `view_products:${process.env.COMMERCETOOLS_PROJECTKEY}`);

  const response = await fetch(
    `${process.env.COMMERCETOOLS_AUTHURL}/oauth/token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization:
          'Basic ' +
          Buffer.from(
            process.env.COMMERCETOOLS_CLIENTID +
              ':' +
              process.env.COMMERCETOOLS_CLIENTSECRET,
          ).toString('base64'),
      },
      body: bodyParams,
    },
  )

  const responseJson = await response.json()
  return responseJson.access_token
}

export const fetchAllProducts = async (): Promise<any[]> => {
  const url = `${process.env.COMMERCETOOLS_APIURL}/${process.env.COMMERCETOOLS_PROJECTKEY}/products?limit=25&expand=productType`

  const token = await getToken()
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const products = await response.json()
  return products.results
}

export const fetchRelatedProducts = async (numberOfProducts: number): Promise<any[]> => {
  const allProducts = await fetchAllProducts()
  if (allProducts && Array.isArray(allProducts)) {
    return allProducts
      .slice(0, 100)
      .map(x => {
        return {
          ...x,
          sortOrder: Math.random(),
        }
      })
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, numberOfProducts)
  }

  return []
}

export const fetchProduct = async (productId: string) => {
  const url = `${process.env.COMMERCETOOLS_APIURL}/${process.env.COMMERCETOOLS_PROJECTKEY}/products/${productId}?expand=productType`

  const token = await getToken()
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${token}`,
    },
  })

  const product = await response.json()
  return product
}
