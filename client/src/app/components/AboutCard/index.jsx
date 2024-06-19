import Image from 'next/image'

const AboutCard = ({ image, name, email }) => {
    return (
        <div className="flex bg-[#242b36] grow min-w-[40vw] justify-evenly items-center m-3 p-5 rounded">
            <Image
                width={100}
                height={100}
                src={image}
                alt={name + " photo"}
                className="rounded-full"
            />
            <div className="text-center text-white">
                <h5 className='text-blue-400'> {name} </h5>
                <h5> {email} </h5>
            </div>
        </div>
    )
}

export default AboutCard;