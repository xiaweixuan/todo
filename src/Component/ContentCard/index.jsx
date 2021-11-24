import { h } from 'fre'

function ContentCard(props) {
  return (<div class="bg-gray-100 min-h-screen sm:py-36 md:py-40">
    <div class="relative flex min-h-400">
      <div class="absolute top-0 bottom-0 mx-auto lg:w-1/2 md:w-3/4 sm:w-full inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
      <div class="relative flex-initial bg-white rounded-xl mx-auto lg:w-1/2 md:w-3/4 sm:w-full">
        <div className="py-8 px-10">
          {props.children}
        </div>
      </div>
    </div>
  </div>)
}

export default ContentCard