import React from 'react';
import './sidebar.css';
import SidebarChat from './SidebarChat';
import { Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import { SearchOutlined } from '@material-ui/icons';

function Sidebar(){
    return(
    <div className='Sidebar'>
        <div className='Sidebar__header'>
        <Avatar src='https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102'/>
            <div className='Sidebar__headerRight'>
            <IconButton>
            <DonutLargeIcon />
            </IconButton>
           <IconButton>
            <ChatIcon />
            </IconButton>
           <IconButton>
            <MoreVertIcon />
            </IconButton>
           </div>
        </div>
        <div className='Sidebar__search'>
          <div className='Sidebar__searchContainer'>
           <SearchOutlined />
        <input placeholder="Search or start new chat" type='text' />
        </div>
        </div>
        <div className='Sidebar__chats'>
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        </div>
    </div>
    );
}
export default Sidebar;