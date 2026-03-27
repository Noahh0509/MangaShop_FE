import { useState } from 'react';
import ProfileSidebar from './ProfileSidebar';
import ProfileInfoPanel from './ProfileInfoPanel';
import ChangePasswordPanel from './ChangePasswordPanel';

export default function ProfileContent() {
    const [activePanel, setActivePanel] = useState('info');

    return (
        <div className="grid grid-cols-[220px_1fr] min-h-[calc(100vh-260px)]">
            <ProfileSidebar activePanel={activePanel} setActivePanel={setActivePanel} />
            <div className="p-10 px-12 animate-[fadeUp_.5s_ease_both]">
                {activePanel === 'info'     && <ProfileInfoPanel />}
                {activePanel === 'password' && <ChangePasswordPanel />}
            </div>
        </div>
    );
}