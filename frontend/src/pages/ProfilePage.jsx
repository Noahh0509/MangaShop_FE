import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileContent from '../components/profile/ProfileContent';

export default function ProfilePage() {
    return (
        <div className="min-h-screen flex flex-col bg-[#0e0e0e] text-[#e8e2d9]">
            <Header />
            <main className="flex-1">
                <ProfileHeader />
                <ProfileContent />
            </main>
            <Footer />
        </div>
    );
}