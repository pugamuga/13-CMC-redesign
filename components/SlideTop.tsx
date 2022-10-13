interface Iprops{
    name:string
}

export default function SlideTop({name}:Iprops):JSX.Element {
  return (
    <div className=" h-full w-full grad-150 rounded-lg">
      {name}
    </div>
  )
}