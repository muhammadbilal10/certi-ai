import { db } from "@/lib/db";

export default function RolePage() {
  const create = async (formData: FormData) => {
    "use server";
    const name = formData.get("role") as string;
    try {
      await db.user.create({
        data: {
          name,
          password: "password",
          email: "muhdbilal@gmail.com",
        },
      });
      console.log("Role set to");
    } catch (e) {
      console.log("Error", e);
    }
  };
  return (
    <div>
      <h1>Select Your Role</h1>
      <form action={create}>
        <select name="role">
          <option value="">Select a role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>

        <button>Set Role</button>
      </form>
    </div>
  );
}
