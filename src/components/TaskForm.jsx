import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select } from "./ui/select";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addTaskPost } from "../redux/slice/taskSlice";
import { toast } from "react-toastify";

export default function TaskForm() {
  // const TaskData = useSelector(item => item.taskStore.taskData)
  const dispatch = useDispatch();
  // console.log(TaskData)
  const [TaskFormData, setTaskFormData] = useState({
    title: "",
    description: "",
    priority: "",
    dueDate: "",
    completed: false,
    category: "",
    estimated: "",
  });

  const HandlChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData((prev) => ({ ...prev, [name]: value }));
  };
  const HandleToogle = (e) => {
    setTaskFormData((prev) => ({ ...prev, completed: e }));
  };

  // const AddTask = () => {
  //   const isValid = Object.entries(TaskFormData).every(([value]) => {
  //     if (typeof value === "boolean") return true; 
  //     return value.trim() !== "";
  //   });
  //   if (isValid) {
  //     dispatch(addTaskPost(TaskFormData));
  //     toast.success("Task Submitted !");
  //   } else {
  //     toast.error("Please Fill the Details First");
  //   }
  // };
  const AddTask = async () => {
const isValid = Object.entries(TaskFormData).every(([_, value]) => {
    if (typeof value === "boolean") return true;
    return value.trim() !== "";
  });

  if (isValid) {
    try {
      const res = await dispatch(addTaskPost(TaskFormData));

      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Task Submitted !");
      } else {
        toast.error("API Failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  } else {
    toast.error("Please Fill the Details First");
  }
};

  // console.log(Object.keys(TaskFormData).length);

  // console.log(TaskFormData)
  return (
    <Card className="glass-panel border-black/10 bg-background/50 shadow-sm mt-6">
      <CardContent className="p-6 md:p-8 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">
              Task Title
            </label>
            <Input
              placeholder="Enter task title"
              type="text"
              name="title"
              onChange={HandlChange}
              value={TaskFormData.title}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground/80">
              Description
            </label>
            <Textarea
              name="description"
              value={TaskFormData.description}
              onChange={HandlChange}
              placeholder="Enter task description"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Priority
              </label>
              <Select
                name="priority"
                value={TaskFormData.priority}
                onChange={HandlChange}
              >
                <option value="" disabled>
                  Select priority
                </option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Due Date
              </label>
              <Input
                type="date"
                name="dueDate"
                value={TaskFormData.dueDate}
                onChange={HandlChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Category / Tag
              </label>
              <Select
                onChange={HandlChange}
                name="category"
                value={TaskFormData.category}
              >
                <option value="" disabled>
                  Select category
                </option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="learning">Learning</option>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">
                Estimated Time
              </label>
              <Input
                placeholder="e.g. 2 hours"
                type="text"
                name="estimated"
                value={TaskFormData.estimated}
                onChange={HandlChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg bg-black/5 border border-black/5">
            <div className="space-y-0.5">
              <label className="text-sm font-medium text-foreground">
                Mark as completed
              </label>
              <p className="text-xs text-foreground/60">
                Instantly archive this task upon creation.
              </p>
            </div>
            <Switch
              checked={TaskFormData.completed}
              onCheckedChange={HandleToogle}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 pt-4 border-t border-black/10">
          <Button variant="outline">Cancel</Button>
          <Button onClick={AddTask}>Add Task</Button>
        </div>
      </CardContent>
    </Card>
  );
}
