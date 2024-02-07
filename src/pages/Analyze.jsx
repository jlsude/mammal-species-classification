import { useState, useEffect } from 'react'
import axios from 'axios'
import imageIcon from '../assets/image-icon.svg'
import Typewriter from 'typewriter-effect'

const Analyze = () => {
    const [image, setImage] = useState(null)
    const [checkerState, setCheckerState] = useState(null)
    const [fileName, setFileName] = useState(null)
    const [releaseResult, setReleaseResult] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [recognized, setRecognized] = useState('Lion')
    const [error, setError] = useState(false)
    const [recognitionMetrics, setRecognitionMetrics] = useState({
        accuracy: '100',
        f1Score: '86',
        recall: '92',
        precision: '89',
    })

    let SERVER_ADDRESS = 'localhost:dadadadad5000'

    const analyze = () => {
        setIsLoading(true)
        setReleaseResult(false)

        const formData = new FormData();

        formData.append('image', image)
        axios.post(`${SERVER_ADDRESS}/predict`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            console.log(response.data)

            setReleaseResult(true)
            setIsLoading(false)
        })
        .catch(error => {
            console.error(error)
        });

    }


    useEffect(() => {
        if (checkerState) {
            if (checkerState[0].type.includes('image/')) {
                console.log('It is an image!')
                console.log(checkerState)
                setError(false)
                setFileName(checkerState[0])
            } else {
                console.log('oh noo it isnt')
                setError(true)
                setReleaseResult(false)
            }
        }
    }, [checkerState])

    

    return (
        <div className="w-screen h-dvh bg-background px-7 py-4
                grid gap-5 grid-rows-7 grid-cols-5 
                md:grid-rows-6 md:grid-cols-10
            ">

            <div className='bg-primary/5 rounded-xl flex flex-col p-3 gap-0 sm:p-5 sm:gap-5 
                row-span-3 col-span-full 
                sm:col-span-3 sm:col-start-2
                md:row-start-2 md:col-start-7 md:col-span-3

            '>
                <div className="bg-primary/5 flex-[0.5] rounded-md flex justify-center items-center">
                    
                    {!error ? (   
                        <label className="font-medium text-text text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-['Fira_Code'] text-center">
                            {releaseResult ? <>
                                <Typewriter
                                    options={{
                                        cursorClassName: 'Typewriter__cursor text-accent font-black',
                                        cursor: ''
                                    }}
                                    onInit={(typewriter) => {
                                    typewriter
                                        .pauseFor(1000)
                                        .typeString(`Recognized as a ${recognized}`)
                                        .start();
                                    }}
                                
                                />
                            </> : null}
                            {isLoading ? <>
                                <label className="font-regular text-accent text-md font-['Fira_Code']">
                                <Typewriter
                                    options={{
                                        loop: true,
                                        cursorClassName: 'Typewriter__cursor text-accent font-black',
                                        cursor: ''
                                    }}
                                    onInit={(typewriter) => {
                                    typewriter
                                        .pauseFor(1000)
                                        .typeString(`loading..`)
                                        .pauseFor(500)
                                        .typeString(`...`)
                                        .pauseFor(10000)
                                        .deleteAll()
                                        .typeString(`fetching results`)
                                        .pauseFor(500)
                                        .typeString(`......`)
                                        .pauseFor(500)
                                        .deleteAll()
                                        .start();
                                    }}
                                
                                />
                                </label>
                            </> : null}
                            {!isLoading && !releaseResult ? <>- - -</> : null}
                        </label>
                    ) :
                    (
                        <label className="font-medium text-[#961909] text-base lg:text-xl xl:text-2xl 2xl:text-3xl font-['Fira_Code'] text-center">
                            <Typewriter
                                    options={{
                                        cursorClassName: 'Typewriter__cursor text-accent font-black',
                                        cursor: '',
                                        strings: ['WARNING', 
                                            'Invalid File Format', 
                                            'Image File Formats Only',
                                            "Recognition process will not proceed until the error is fixed"],
                                        autoStart: true,
                                        loop: true

                                    }}
                            />
                        </label>
                    )}
                </div>

                <div className="flex-1 rounded-md p-2 flex ">
                    <label className="font-regular text-text text-md font-['Fira_Code'] text-sm lg:text-base text-pretty">
                        {/* Result typewriter */}
                        {releaseResult ? <>
                            <Typewriter
                                options={{
                                    cursorClassName: 'Typewriter__cursor text-accent font-black',
                                    delay: 60
                                }}
                                onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(2000)
                                    .typeString('The uploaded image bears a resembksnxe to a')
                                    .pauseFor(300)
                                    .deleteChars(10)
                                    .typeString('lance to a ')
                                    .typeString(`<strong><span style="color: #4B19F0; font-weight: 500;">${recognized} Predator</span></strong>.`)
                                    .pauseFor(750)
                                    .typeString('<br/>')
                                    .pauseFor(500)
                                    .typeString(`<br/>This result is obtained with <span style="color: #4B19F0; 
                                        font-weight: 500;">${recognitionMetrics.accuracy}% Accuracy</span>, `)
                                    .pauseFor(200)
                                    .typeString(`an <span style="color: #4B19F0; font-weight: 500;">F1 score of ${recognitionMetrics.f1Score}%</span>, `)
                                    .pauseFor(100)
                                    .typeString(`a <span style="color: #4B19F0; font-weight: 500;">Recall of ${recognitionMetrics.recall}%</span> `)
                                    .typeString(`and a <span style="color: #4B19F0; font-weight: 500;">Precision Score of 9%@^$</span>`)
                                    .deleteChars(5)
                                    .typeString(`<span style="color: #4B19F0; font-weight: 500">${recognitionMetrics.precision}%</span>.`)
                                    .start();
                                }}
                            
                            />
                        </> : null}
                    </label>

                    <label className="font-regular text-accent text-md font-['Fira_Code']">
                        {/* Idle typewriter */}
                        {!isLoading && !releaseResult ? <>
                            <Typewriter
                                options={{
                                    loop: true,
                                    cursorClassName: 'Typewriter__cursor text-accent font-black'
                                  }}
                                onInit={(typewriter) => {
                                typewriter
                                    .typeString('waitiong')
                                    .deleteChars(4)
                                    .typeString('ing for input..')
                                    .pauseFor(1000)
                                    .deleteChars(7)
                                    .typeString('image file input')
                                    .pauseFor(2000)
                                    .typeString('.......')
                                    .pauseFor(5000)
                                    .deleteAll()
                                    .pauseFor(1000)
                                    .typeString('checking for any input..')
                                    .pauseFor(500)
                                    .typeString('...')
                                    .pauseFor(1000)
                                    .typeString('...')
                                    .pauseFor(3000)
                                    .deleteAll()
                                    .typeString('only image file formats are accepted..')
                                    .pauseFor(800)
                                    .typeString('....')
                                    .pauseFor(3000)
                                    .deleteAll()
                                    .start()
                                }}
                            
                            />
                        </> : null}
                        {/* Loading typewriter */}
                        {isLoading  ? <>
                            <Typewriter
                                options={{
                                    loop: true,
                                    cursorClassName: 'Typewriter__cursor text-accent font-black'
                                  }}
                                onInit={(typewriter) => {
                                typewriter
                                    .pauseFor(1000)
                                    .typeString('loading.....')
                                    .pauseFor(3000)
                                    .deleteAll()
                                    .typeString('is it a lion?')
                                    .pauseFor(1000)
                                    .deleteAll()
                                    .typeString('is it a ti@!%#')
                                    .deleteChars(6)
                                    .pauseFor(100)
                                    .typeString('tiger?')
                                    .pauseFor(1000)
                                    .deleteAll()
                                    .typeString('or a jaguar?')
                                    .pauseFor(2000)
                                    .deleteAll()
                                    .typeString('maybe it is a btdfege')
                                    .deleteChars(6)
                                    .pauseFor(200)
                                    .typeString('ird')
                                    .pauseFor(100)
                                    .typeString('....?')
                                    .pauseFor(1500)
                                    .deleteAll()
                                    .pauseFor(500)
                                    .typeString('or a plane...')
                                    .pauseFor(1000)
                                    .typeString('...?')
                                    .pauseFor(500)
                                    .deleteAll()
                                    .typeString('or a bird plane?')
                                    .pauseFor(800)
                                    .deleteAll()
                                    .typeString('or....')
                                    .pauseFor(500)
                                    .typeString('is it a me Mario?')
                                    .pauseFor(1700)
                                    .deleteAll()
                                    .start()
                                }}
                            
                            />
                        </> : null}

                    </label>
                </div>
            </div>

            <div className='bg-primary/5 rounded-xl p-5
                row-start-4 row-span-3 col-span-full
                sm:col-span-3 sm:col-start-2
                md:row-start-2 md:row-span-4 md:col-start-2 md:col-span-5
            '>
                <div className="w-full h-full rounded-md border-dashed border-primary/5 border-2 relative 
                    flex flex-col justify-center items-center px-5 gap-2 hover:cursor-pointer"
                    onClick={()=> {document.querySelector('.upload-image').click()}}
                    onChange={({ target: {files}}) => {
                        files[0] && setCheckerState(files)
                        if(files){
                            setImage(URL.createObjectURL(files[0]))
                        }
                    }}
                    >
                    <input type="file" accept='image/*' hidden
                        className='upload-image'
                        />

                    {image ? <>
                        <img src={image} alt={checkerState[0].name} className='absolute object-contain w-full h-full text-text' />
                        
                    </>: <>
                        <img src={imageIcon} alt="Image Icon" />
                        <h3 className='text-center text-sm md:text-base'>
                            <span className="font-medium text-accent text-md font-['Fira_Code']">
                                Upload
                            </span>
                            &nbsp; an image here to begin the recognition process
                        </h3>
                        
                    </>}
                    
                </div>
            </div>

            <div className='flex justify-center items-center 
                row-start-7 col-span-full 
                md:row-start-5 md:col-start-7 md:col-span-3 '>

                <button onClick={() => {analyze()}}
                        disabled={error || !checkerState || isLoading}
                >Analyze</button>

            </div>
            
        </div>
    )
}

export default Analyze