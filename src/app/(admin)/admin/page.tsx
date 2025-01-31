import Link from "next/link";

export default function Admin() {
	return (
        <div className="flex justify-center items-center rounded-lg">
            <form className={`bg-white py-3 px-4 w-96 border rounded-lg flex flex-col gap-3 form`}>
                <h1 className="text-3xl text-black text-center text-tertiary-color font-bold">Login</h1>
                <div>
                    <label className="text-black">Unique ID</label>
                    <input
                        type="number"
                        name="uniqueId"
                        id="uniqueId"
                        placeholder="Enter your unique ID"
                        required
                    />
                </div>
                <div>
                    <label className="text-black">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-tertiary-color text-white p-2 rounded-lg font-bold"
                >
                    Login
                </button>
                <span className="mt-4 text-center font-bold">
                    Don&apos;t have account? <Link className="text-tertiary-color" href="/signup">Signup</Link> 
                </span>
            </form>
        </div>
    );
}