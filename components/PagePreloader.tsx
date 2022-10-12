export default function PagePreloader(): JSX.Element {
  return <div className=" fixed h-screen w-screen top-0 left-0 bg-gradient-to-tr from-primary to-purple-900 z-[999] superflex">
    <img src="/assets/banner.gif"  className="w-24 h-24"/>
    <p className="ml-2">Loading...</p>
  </div>;
}
