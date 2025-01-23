import Card from "./Card"

function Content() {
  return (
    <section  className="px-4 flex flex-col py-12 bg-orange-50 rounded-2xl mx-4 gap-12 justify-center items-center " >
      <div className="flex flex-col items-center justify-center gap-2 " >
        <h2 className="tracking-tighter text-orange-950 text-4xl font-extrabold" >
          Cancerous Products
        </h2>
        <p className="text-orange-950 text-xl text-center max-w-lg">
          Discover an extensive selection of highly cancerous products designed specifically for you!
        </p>
      </div>
      <div className="flex flex-col items-center gap-6" >
        <Card/>
        <Card/>
        <Card/>
      </div>
    </section>
  )
}

export default Content
