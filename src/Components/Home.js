import { useAuth } from "../context/authContext";
import TaskBanner from "./TaskBanner";

import Tasks from "./Tasks";
import { useEffect, useState } from "react";
import Settings from "./Settings";

export function Home() {
  const { user, logout, createFirestore , saveFirestore, getFirestore } = useAuth();
  const [showSettings, setShowSettings] = useState(false);
  const [userName, setUserName] = useState((user.displayName || user.email) + ' Task App');

  useEffect(() => {
    createFirestore();
  }, [createFirestore]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFirestore('username');
      if(data !== undefined){
        setUserName(data);
      }
    }
    fetchData();
  }, [getFirestore]);

  useEffect(() => {
    const saveData = async () => {
      if(userName !== ((user.displayName || user.email) + ' Task App')){
        await saveFirestore({'username': userName});
      }
    }
    saveData();
  }, [saveFirestore, user.displayName, user.email, userName]);
  
  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-slate-100 w-full">
      <TaskBanner user={userName} handleLogout={handleLogout} showSettings={showSettings} setShowSettings={setShowSettings}/>
      <Tasks/>
      <Settings showSettings={showSettings} setShowSettings={setShowSettings} user={user} setUserName={setUserName}/>
    </div>
  );
}
