"use client";
import { addMember } from "@/actions/actions";
import SearchBar from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useActionState } from "react";

export default function Members() {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  const [data, action, isPending] = useActionState(addMember, undefined);

  const handleClick = () => {
    setMessage(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  useEffect(() => {
    if (data) {
      if (data.success) {
        setOpen(false);
        setMessage(null);
      } else {
        setMessage(data.message);
      }
    } else if (data === undefined || data === null) {
      setMessage("Something went wrong");
    }
  }, [data]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [open]);

  return (
    <div className="flex flex-col items-center gap-2 py-4 relative">
      <div>
        <h1>Members List</h1>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={handleClose}
        />
      )}

      <div
        className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <form
          action={action}
          className="flex flex-col gap-4 bg-white p-6 rounded-md w-full max-w-sm shadow-lg transform transition-transform duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <Input
              type="text"
              name="firstName"
              id="firstName"
              placeholder="First Name"
              defaultValue={data?.fieldData?.firstName}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="text"
              name="lastName"
              id="lastName"
              placeholder="Last Name"
              defaultValue={data?.fieldData?.lastName}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Phone Number"
              defaultValue={data?.fieldData?.phoneNumber}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="number"
              name="flat"
              id="flat"
              placeholder="Flat Number"
              defaultValue={data?.fieldData?.flat}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              placeholder="Date Of Birth"
              defaultValue={data?.fieldData?.dateOfBirth}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="date"
              name="anniversary"
              id="anniversary"
              placeholder="Anniversary"
              defaultValue={data?.fieldData?.anniversary}
              className="w-full"
            />
          </div>

          {message && (
            <div>
              <p className="text-red-500 text-sm">{message}</p>
            </div>
          )}

          <div className="flex gap-2">
            <Button
              type="submit"
              className="bg-green-500 text-white w-full"
              disabled={isPending}
            >
              Submit
            </Button>
            <Button
              onClick={handleClose}
              className="bg-red-500 text-white w-full"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>

      <div className="flex gap-4">
        <SearchBar />
        <Button onClick={handleClick}>
          <PlusIcon className="text-white" />
        </Button>
      </div>
    </div>
  );
}
