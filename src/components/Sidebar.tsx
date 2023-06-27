import Image from "next/image";
import SidebarMenuItem from "./SidebarMenuItem";
import {BellIcon, BookmarkIcon, ClipboardIcon, DotsCircleHorizontalIcon, DotsHorizontalIcon, HashtagIcon, HomeIcon, InboxIcon, UserIcon} from '@heroicons/react/solid';

export default function Sidebar() {
    
    
  return (
    <div className="hidden sm:flex flex-col p-2 xl:items-start fixed h-full xl:ml-24">
        {/* logo */}
        <div className="hoverEffect hover:bg-blue-100 ">
            <Image src="https://s2-g1.glbimg.com/gVdcK1kqQtZE-LyBJX1DIpm3A-g=/0x0:1600x1302/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2022/n/v/RksT97TX2HRnLjAcW8Sw/twt.png" width={30} height={30}  alt="Twitter logo"></Image>
        </div>
        {/* menu */}
        <menu className="mt-4 mb-3 xl:items-start">
            <SidebarMenuItem caption="Home" href="" icon={HomeIcon} active/>
            <SidebarMenuItem caption="Explore" href="" icon={HashtagIcon} />
            <SidebarMenuItem caption="Notifications" href="" icon={BellIcon} />
            <SidebarMenuItem caption="Messages" href="" icon={InboxIcon} />
            <SidebarMenuItem caption="Bookmarks" href="" icon={BookmarkIcon} />
            <SidebarMenuItem caption="Lists" href="" icon={ClipboardIcon} />
            <SidebarMenuItem caption="Profile" href="" icon={UserIcon} />
            <SidebarMenuItem caption="More" href="" icon={DotsCircleHorizontalIcon} />
        </menu>
        {/* button */}
        <button className="bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-90 text-lg hidden xl:inline">Tweet</button>
        {/* miniprofile */}
        <div className="hoverEffect text-gray-700 flex items-center justify-center xl:justify-start mt-auto">
            <Image src={''} alt="user img" width={40} height={40}/>
            <div className="leading-5 hidden xl:inline">
                <h4 className="font-bold">Willian rios</h4>
                <p className="text-gray-500 rounded-full xl:mr2-">@williangerios</p>
            </div>
            <DotsHorizontalIcon className="h-5 xl:ml-8 hidden xl:inline"/>
        </div>
    </div>
  )
}
