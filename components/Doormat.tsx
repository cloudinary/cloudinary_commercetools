export interface DoormatProps {}

const Doormat = () => {
  return (
    <div className="grid bg-[#D9D9D9] p-[6.25vw] text-2xl lg:grid-cols-5">
      <div className="mb-5 flex flex-col gap-5">
        <h4 className="font-medium">Rêvasser</h4>
      </div>
      <div className="mb-5 flex flex-col gap-5">
        <h4 className="font-medium">Shop</h4>
        <p>Cakes</p>
        <p>Patisseries</p>
        <p>Cookies</p>
        <p>Croissants</p>
      </div>
      <div className="mb-5 flex flex-col gap-5">
        <h4 className="font-medium">Company</h4>
        <p>What is new</p>
        <p>About</p>
        <p>Shop</p>
        <p>Gifts</p>
      </div>
      <div className="mb-5 flex flex-col gap-5">
        <h4 className="font-medium">Branches</h4>
        <p>Tel Aviv, IL</p>
        <p>London, UK</p>
        <p>Krakow, PL</p>
      </div>
      <div className="mb-5 flex items-start gap-5">
        <img src="/assets/facebook.svg" alt="facebook" width="40" height="40" />
        <img
          src="/assets/instagram.svg"
          alt="instagram"
          width="40"
          height="40"
        />
      </div>
    </div>
  )
}

export default Doormat
