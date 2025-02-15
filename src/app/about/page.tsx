// On this page we have used a little more HTML tags and worked less with CSS styles to highlight elements as these tags contain metadata that can be understood by custom scripts.

export default function AboutPage() {
    return (
        <div className="max-h-[489px] p-3 bg-white text-black overflow-auto">
            <h1 className="w-full text-center text-tertiary-color text-5xl font-bold underline">About</h1>
            <br />
            <h2 className="w-full text-tertiary-color text-3xl font-bold underline">Institute</h2>
            <br />
            <p>
                This AICTE approved Institute under GGSIP University is ideally located in the Institutional area of  Janakpuri, New Delhi. Established in 2001, MSIT has a campus spread over eight acres of land with beautiful eco-friendly surroundings. Institute was earlier operating from four storey building of 6279 sq.m of built up area. Later it was shifted to a more spacious seven storeyed building with built up area of 17837 sq.m. The institute has over a short span of time acquired and developed impressive infrastructure, expertise and resources for imparting high quality engineering education. The institute provides Bachelor of Technology in CSE, IT, ECE and EEE streams.
            </p>
            <br />
            <h2 className="w-full text-tertiary-color text-3xl font-bold underline">About the portal</h2>
            <br />
            <p>
                This portal is created to collect and resolve any grievance that a parent, student or teacher may have.
            </p>
            <br />
            <h2 className="w-full text-tertiary-color text-3xl font-bold underline">How to signup?</h2>
            <br />
            <p>
                For <u><strong>students</strong></u>: Use your enrollment number as your <strong>Unqiue ID</strong>
                <br />
                For <u><strong>teachers</strong></u>: Use your college id as your <strong>Unqiue ID</strong>
                <br />
                For <u><strong>parents</strong></u>: Use a personal email as your <strong>Unqiue ID</strong>
                <br /><br />
                Enter rest of the signup details normally
            </p>
        </div>
    );
};