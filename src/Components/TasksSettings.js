import "antd/dist/antd.css";
import { Popover, Button, Modal, Input } from "antd";
import { useState, useEffect } from "react";
import { useAuth } from '../context/authContext';

export default function TasksSettings(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [newTaskListName, setNewTaskListname] = useState();
    const [isPopoverVisible, setIsPopoverVisible] = useState(false);

    const { saveFirestore, getFirestore } = useAuth();

    useEffect(() => {
      const fetchData = async () => {
        const data = await getFirestore('taskname');

        if(data !== undefined){
          props.setTaskListName(data);
        }
      }
      fetchData();
    }, [getFirestore, props]);

    useEffect(() => {
      const saveData = async () => {
        if(props.taskListName !== 'My tasks'){
          await saveFirestore({taskname: props.taskListName})
        }
      }
      saveData();
    }, [props.taskListName, saveFirestore]);

    const inputHandler = (e) => {
        setNewTaskListname(e.target.value);
    }

    const handleOk = () => {
        props.setTaskListName(newTaskListName);
        setIsModalVisible(false);
    }

    const handleCancel = () => {
        setIsModalVisible(false);
    }

  const content = (
    <div className="text-gray-500">
      <p
        className="flex gap-2 hover:brightness-50 cursor-pointer"
        onClick={() => {
            setIsModalVisible(true);
            setIsPopoverVisible(false);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-edit"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#808080"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
          <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
          <line x1="16" y1="5" x2="19" y2="8" />
        </svg>
        Rename List
      </p>
      <p className="flex gap-2 hover:brightness-50" onClick={() => {
          setIsPopoverVisible(false)
          props.deleteCompletedTasks();
      }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-square-x"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#808080"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <rect x="4" y="4" width="16" height="16" rx="2" />
          <path d="M10 10l4 4m0 -4l-4 4" />
        </svg>
        Delete all completed tasks
      </p>
    </div>
  );

  return (
    <div>
      <Popover placement="leftTop" content={content} visible={isPopoverVisible} onClick={() => setIsPopoverVisible(!isPopoverVisible)} >
        <Button type="text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-dots-vertical mr-1"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#808080"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            id="popcorn"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <circle cx="12" cy="12" r="1" />
            <circle cx="12" cy="19" r="1" />
            <circle cx="12" cy="5" r="1" />
          </svg>
        </Button>
      </Popover>
      <Modal title="Change task name" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <Input placeholder="Set new task name" onChange={(e) => inputHandler(e)}/>
      </Modal>
    </div>
  );
}
