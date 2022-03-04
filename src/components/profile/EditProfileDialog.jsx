import { FaEdit } from "solid-icons/fa";
import { createSignal } from "solid-js";
import useEditProfile from "../../hooks/profile/useEditProfile";
import Modal from "../ui/feedback/Modal";
import Radio from "../ui/form/Radio";
import IconButton from "../ui/inputs/IconButton";
export default function EditProfile() {
  const { handleSubmit, onChange, onInput, store } = useEditProfile();
  const [open, setOpen] = createSignal(false);
  return (
    <div>
      <IconButton
        className="flex-none"
        title="Edit Profile"
        onClick={() => setOpen(true)}
      >
        <FaEdit />
      </IconButton>

      <Modal onClose={() => setOpen(false)} open={open()} title="Edit Profile">
        <div className="px-4">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  className="rounded-lg dark:bg-gray-700"
                  value={store.fields.firstName}
                  onInput={[onInput]}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  className="rounded-lg dark:bg-gray-700"
                  value={store.fields.lastName}
                  onInput={[onInput]}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-2">
              <label htmlFor="name">Email</label>
              <input
                type="email"
                name="email"
                className="rounded-lg dark:bg-gray-700"
                value={store.fields.email}
                onInput={[onInput]}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <p>Gender</p>
              <div className="grid grid-cols-3 gap-2">
                <Radio
                  onChange={(e) => onChange(e)}
                  value="MALE"
                  type="radio"
                  isChecked={store.fields.gender === "MALE"}
                  name="gender"
                  label={"Male"}
                />
                <Radio
                  onChange={(e) => onChange(e)}
                  value="FEMALE"
                  type="radio"
                  isChecked={store.fields.gender === "FEMALE"}
                  name="gender"
                  label={"Female"}
                />
                <Radio
                  onChange={(e) => onChange(e)}
                  value="OTHER"
                  type="radio"
                  isChecked={store.fields.gender === "OTHER"}
                  name="gender"
                  label={"Other"}
                />
              </div>
            </div>
            <div className="flex justify-end mt-4">
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">
                Edit Profile
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
