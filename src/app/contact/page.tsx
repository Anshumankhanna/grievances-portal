export default function ContactPage() {
    return (
        <div className="size-full max-w-[100vw] overflow-auto p-3 bg-white text-black flex place-content-center">
            <div className="grid grid-cols-[1fr_2fr_1fr_2fr] w-full h-fit [&_>_*]:border-b [&_>_*]:border-gray-500 [&_>_*]:p-3 [&_>_*]:break-words">
                <div className="text-red-600 font-bold underline text-lg">S.no.</div>
                <div className="text-red-600 font-bold underline text-lg">Name of faculty</div>
                <div className="text-red-600 font-bold underline text-lg">Designation</div>
                <div className="text-red-600 font-bold underline text-lg">Contact</div>
                <div>1</div>
                <div>Prof. (Dr.) Archana Balyan</div>
                <div>Chairperson</div>
                <div>
                    director@msit.in
                    Tel (O): 011-25528117, 011-25552667
                </div>
                <div>2</div>
                <div>Dr. Kavita Sheoran</div>
                <div>Member</div>
                <div>kavita.sheoran@msit.in</div>
                <div>3</div>
                <div>Dr. Naresh Kumar</div>
                <div>Member</div>
                <div>nareshkumar@msit.in</div>
                <div>4</div>
                <div>Mr. Manoj Malik</div>
                <div>Member</div>
                <div>manojmalik@msit.in</div>
                <div>5</div>
                <div>Pradyuman Pandey</div>
                <div>Student Representative</div>
                <div>
                    (04296303121)
                    9654681717
                    pradyumnpandey11@gmail.com
                </div>
                <div>6</div>
                <div>Ankush Kumar</div>
                <div>Student Representative</div>
                <div>
                    (04396303121)
                    9968900846
                    ankushkumar11903@gmail.com
                </div>
                <div>7</div>
                <div>Shruti Verma</div>
                <div>Student Representative</div>
                <div>
                    (03996303121)
                    8800453135
                    vshruti186@gmail.com
                </div>
            </div>
        </div>
    );
};