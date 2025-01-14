//Jani Onkalo
//Edited:27.10.2024

const samplesBass =[]

samplesBass.push({src: "bass_mp3/bass-dropmp.mp3", name: "Bass drop"})
samplesBass.push({src: "bass_mp3/bass-slide.mp3", name: "Bass slide"})
samplesBass.push({src: "bass_mp3/distortion-bass.mp3", name: "Bass distortion"})
samplesBass.push({src: "bass_mp3/mega-bass-sub.mp3", name: "Bass sub"})
samplesBass.push({src: "bass_mp3/stab-bass.mp3", name: "Bass stab"})

const samplesDrum =[]

samplesDrum.push({src: "drum_mp3/drum-roll.mp3", name: "Drum roll"})
samplesDrum.push({src: "drum_mp3/noise-drum.mp3", name: "Drum noise"})
samplesDrum.push({src: "drum_mp3/war-drum.mp3", name: "Drum war"})

const samplesGuitar =[]

samplesGuitar.push({src: "guitar_mp3/foo-fighters-type-guitar.mp3", name: "Guitar roll"})
samplesGuitar.push({src: "guitar_mp3/nirvana-type-guitar.mp3", name: "Guitar nirvana"})
samplesGuitar.push({src: "guitar_mp3/relaxing-guitar.mp3", name: "Guitar relaxing"})


let tracks = []
tracks.push({ samples: [], isDeleted: false })

tracksDiv = document.getElementById("tracks")

//the first track automatically
for (let i = 0; i < tracks.length; i++) {
    let trackDiv = document.createElement("div")
    trackDiv.setAttribute("id", "trackDiv" + i)
    trackDiv.className = "track"

    tracksDiv.appendChild(trackDiv)

    let controlsDiv = document.createElement("div")
    controlsDiv.setAttribute("id", "controlsDiv" + i)
    controlsDiv.className = "controls"

    let trackVolume = document.createElement("input")//track volume slider
    trackVolume.setAttribute("id", "trackVolume" + i)
    trackVolume.setAttribute("type", "range")
    trackVolume.setAttribute("min", "0")
    trackVolume.setAttribute("max", "1")
    trackVolume.setAttribute("step", "0.1")
    trackVolume.setAttribute("value", "1")

    let trackVolumeHeader = document.createElement("p")
    trackVolumeHeader.innerText = "Volume"

    let trackRepeatHeader = document.createElement("p")
    trackRepeatHeader.innerText = "Repeat track"

    let trackRepeat = document.createElement("input")//Track repeat checkbox
    trackRepeat.setAttribute("id", "trackRepeat" + i)
    trackRepeat.setAttribute("type", "checkbox")

    let trackDelete = document.createElement("button")//track delete button
    trackDelete.setAttribute("id", "trackDelete" + i)
    trackDelete.innerText = "Delete track"

    controlsDiv.appendChild(trackVolumeHeader)
    controlsDiv.appendChild(trackVolume)
    controlsDiv.appendChild(trackRepeatHeader)
    controlsDiv.appendChild(trackRepeat)
    controlsDiv.appendChild(trackDelete)

    tracksDiv.appendChild(controlsDiv)

    trackDelete.addEventListener("click", ()=>{
        deletetrack(i)
    })

    trackDiv.addEventListener("dragover", (event) => {
        event.preventDefault()
    })

    trackDiv.addEventListener("drop", (event) => {
        event.preventDefault()
        const sampleId = event.dataTransfer.getData("text/plain")
        addSample(sampleId, i)

    })
}


const addTrack=document.getElementById("add-tracks")

//make track when cliked Add track
addTrack.addEventListener("click",function () {
    let i = tracks.length
    tracks.push({ samples: [], isDeleted: false })
    let trackDiv = document.createElement("div")
    trackDiv.setAttribute("id", "trackDiv"+i)

    trackDiv.className = "track"

    tracksDiv.appendChild(trackDiv)

    let controlsDiv = document.createElement("div")
    controlsDiv.setAttribute("id", "controlsDiv" + i)
    controlsDiv.className = "controls"

    let trackVolume = document.createElement("input")//track volume slider
    trackVolume.setAttribute("id", "trackVolume" + i)
    trackVolume.setAttribute("type", "range")
    trackVolume.setAttribute("min", "0")
    trackVolume.setAttribute("max", "1")
    trackVolume.setAttribute("step","0.1")
    trackVolume.setAttribute("value", "1")

    let trackVolumeHeader = document.createElement("p")
    trackVolumeHeader.innerText = "Volume"

    let trackRepeatHeader = document.createElement("p")
    trackRepeatHeader.innerText = "Repeat track"

    let trackRepeat = document.createElement("input")//Track repeat checkbox
    trackRepeat.setAttribute("id", "trackRepeat" + i)
    trackRepeat.setAttribute("type", "checkbox")

    let trackDelete = document.createElement("button")//track delete button
    trackDelete.setAttribute("id", "trackDelete" + i)
    trackDelete.innerText = "Delete track"

    controlsDiv.appendChild(trackVolumeHeader)
    controlsDiv.appendChild(trackVolume)
    controlsDiv.appendChild(trackRepeatHeader)
    controlsDiv.appendChild(trackRepeat)
    controlsDiv.appendChild(trackDelete)

    tracksDiv.appendChild(controlsDiv)

    trackDelete.addEventListener("click", ()=>{
        deletetrack(i)
    })

    trackDiv.addEventListener("dragover", (event) => {
        event.preventDefault()
    })

    trackDiv.addEventListener("drop", (event) => {
        event.preventDefault()
        const sampleId = event.dataTransfer.getData("text/plain");
        addSample(sampleId, i)
    })
})


function deletetrack(trackId) {
    const trackDiv = document.getElementById("trackDiv" + trackId)
    trackDiv.remove()

    const controlsDiv = document.getElementById("controlsDiv" + trackId)
    controlsDiv.remove()
    //console.log(trackId)
    tracks[trackId].isDeleted = true //marks that track isDeleted
    //console.log(trackId)
}



const dropBtn = document.getElementById("dropdown-content")
let id = 0

samplesBass.forEach((sample) => {
    createSampleBtn(sample, dropBtn, id++)
})

const dropBtn2 =document.getElementById("dropdown-content-drum")

samplesDrum.forEach((sample) => {
    createSampleBtn(sample, dropBtn2, id++)
})

const dropBtn3 =document.getElementById("dropdown-content-guitar")

samplesGuitar.forEach((sample) => {
    createSampleBtn(sample, dropBtn3, id++)
})

function createSampleBtn(sample, dropBtn, sampleId){
    console.log(sample.name)

    let newButton = document.createElement("a")
    newButton.setAttribute( "data-id",sampleId)
    newButton.setAttribute("draggable", "true")


    newButton.addEventListener("dragstart",(event) => {
        event.dataTransfer.setData("text/plain", newButton.getAttribute("data-id"))
    })

    newButton.innerText=sample.name

    let touchTrackDiv

    newButton.addEventListener("touchstart", (event) => {
        event.preventDefault()
        const sampleId=newButton.getAttribute("data-id")
        newButton.setAttribute("data-dragging",sampleId)
    })
    
    newButton.addEventListener("touchmove", (event) => {
        event.preventDefault()
        if(touchTrackDiv){
            let touch= event.touches[0]
            touchTrackDiv.style.left=touch.pageX+ "px"
            touchTrackDiv.style.top=touch.pageY+ "px"
        }
    })

    newButton.addEventListener("touchend", (event) => {
    event.preventDefault()

    const targetTrackDiv=document.elementFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY)
    
    if (targetTrackDiv && targetTrackDiv.classList.contains("track")) {
        const trackIndex = targetTrackDiv.id.replace("trackDiv", "")
        addSample(sampleId, trackIndex)
    }
    
    newButton.removeAttribute("data-dragging")
    })

    dropBtn.appendChild( newButton)
}



function addSample(sampleId, trackId) {
    const trackNumber = trackId
    let sampleArray
    let sampleIndex

    if (sampleId < samplesBass.length) {
        sampleArray = samplesBass
        sampleIndex = sampleId
    } 
    
    else if (sampleId < samplesBass.length + samplesDrum.length) {
        sampleArray = samplesDrum
        sampleIndex = sampleId - samplesBass.length
    } 
    
    else {
        sampleArray = samplesGuitar
        sampleIndex = sampleId - samplesBass.length - samplesDrum.length
    }

    console.log("SampleNumber: " +sampleId + ". Track Number: " + trackNumber)

    
    if (trackNumber >= 0 && trackNumber < tracks.length && !tracks[trackNumber].isDeleted) {
        const audio= new Audio(sampleArray[sampleIndex].src) //get audios duration in sec
        audio.addEventListener('loadedmetadata', () => {
            console.log("Track length: " + audio.duration + " seconds")

            tracks[trackNumber].samples.push(sampleArray[sampleIndex])


            let trackDiv = document.getElementById("trackDiv" + trackNumber)
            const sampleParts = document.createElement("div")
            sampleParts.className = "sampleParts"

            const visual = document.createElement("div")
            visual.className="audioVisual"

            const lengthPixel = audio.duration *15 //Make div which length is audio sec * 15px
            visual.style.width = lengthPixel+"px"
            visual.innerText = sampleArray[sampleIndex].name

            trackDiv.appendChild(visual)

            /*let sampleVolume = document.createElement("input") //Make sliding switch for sample volume
            sampleVolume.setAttribute("id", "trackVolume" + trackNumber + "_" + sampleIndex)
            sampleVolume.setAttribute("type", "range")
            sampleVolume.setAttribute("min", "0")
            sampleVolume.setAttribute("max", "1")
            sampleVolume.setAttribute("step", "0.1")
            sampleVolume.setAttribute("value", "1")*/

            let sampleDelete = document.createElement("button")
            sampleDelete.setAttribute("class", "deleteSample")
            sampleDelete.innerText = "Delete sample"
            

            //sampleParts.appendChild(sampleVolume)
            sampleParts.appendChild(sampleDelete)

            trackDiv.appendChild(sampleParts)

            sampleDelete.addEventListener("click", () => {
                const sampleIndex=tracks[trackNumber].length - 1
                deleteSample(trackNumber, sampleIndex, sampleParts, visual)
            })

        })
    }
}

function deleteSample(trackNumber, sampleIndex,sampleParts, visual) {
    const trackDiv=document.getElementById("trackDiv"+ trackNumber)

    /*console.log(tracks[trackNumber])
    console.log(sampleIndex)*/
    tracks[trackNumber].samples.splice(sampleIndex-1, 1)
    //console.log(tracks[trackNumber])
    trackDiv.removeChild(sampleParts)
    trackDiv.removeChild(visual)
}


const playButton = document.getElementById("play")
playButton.addEventListener("click", ()=>playSong())

function playSong(){
    let i = 0

    tracks.forEach((track)=>{
        if(track.samples.length>0 && !track.isDeleted){
            playTrack(track, i)
        }
        i++
    })
}

function playTrack(track, trackNumber){
    let i =0

    const playNextAudio = () => {
        if (i >= track.samples.length) {
            if (document.getElementById("trackRepeat" + trackNumber).checked) {
                i = 0
            } else {
                return
            }
        }
        
        const audio = new Audio(track.samples[i].src)
        

        audio.volume = parseFloat(document.getElementById("trackVolume" + trackNumber).value)

        /*if(){sample volume==1)
            audio.volume = parseFloat(document.getElementById("trackVolume" + trackNumber).value);

        }
        else{
            soita sample samplen omalla volumilla

        }*/
        
        audio.play()
        console.log("Starting: track" + trackNumber + ", instrument " + track.samples[i].name)

        audio.addEventListener("ended", () => {
            i++
            playNextAudio()
        })
    }
    playNextAudio()
}




// combine tracks into one soundtrack

/*const downloadSong=document.getElementById("download-song")

downloadSong.addEventListener("click", ()=>{
    combineTracks()

})

async function combineTracks(){
    const combinedtracksBuffer = await setupTracks(tracks)
}

async function getTracks(tracks) {  

    const response = await fetch(tracks)
    const arrayBuffer = await response.arrayBuffer()
    return arrayBuffer 
}

async function setuptracks(tracks){
    const audioBuffers=[]

    for (const track of tracks){
        const track=await getFile(path)
        audioBuffers.push(tracks)
    }
    return audioBuffers
}*/


