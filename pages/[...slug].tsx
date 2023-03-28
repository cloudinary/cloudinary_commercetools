import React from 'react'
import {GetStaticProps} from 'next'
import {Params} from '../lib/types'
import {useTranslation} from 'next-i18next'
import {serverSideTranslations} from 'next-i18next/serverSideTranslations'
import PageLayout from 'layouts/page'

function LandingPage() {
  const {t} = useTranslation('common')

  return (
    <div>
      <h1>{t('test')}</h1>
      <PageLayout />
    </div>
  )
}

export const getServerSideProps: GetStaticProps<any, Params> = async ({
  preview,
  locale,
}) => {
  const translations = await serverSideTranslations(locale!, ['common'])

  return {
    props: {
      ...translations,
      preview: preview ?? false,
    },
  }
}

export default LandingPage
