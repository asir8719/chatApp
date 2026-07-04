import ChatApp from './Components/ChatApp';
import './App.css';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';

function App() {
  return (
    <>
      <SignedOut>
        <div className="min-h-screen bg-[#1d1f1f] flex flex-col items-center justify-center gap-4 p-4">
          <h1 className="text-white text-xl font-medium">Welcome to Chat</h1>
          <div className="flex gap-3">
            <SignInButton mode="modal" />
            <SignUpButton mode="modal" />
          </div>
        </div>
      </SignedOut>
      <SignedIn>
        <ChatApp />
      </SignedIn>
    </>
  );
}

export default App;
