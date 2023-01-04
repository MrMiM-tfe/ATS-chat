import React, { useEffect, useRef, useState } from "react"
import {Peer} from "peerjs"

const peer = new Peer({
    host:"/",
    port: 3300
})

const Test = () => {
    
    const [ID, setID] = useState("")
    const [MyID, setMyID] = useState()

    const [localS, setLocalS] = useState()
    const [remoteS, setRemoteS] = useState([])


    const localV = useRef()
    const remoteV = useRef()
    
    useEffect(() => {
        
        getMediaStrams()

        peer.on("open", id => {
            setMyID(id)
        })

    }, [])

    const connectWithPeer = (id) => {
        const call = peer.call(id, localS)

        call.on('stream', (stream) => {
            console.log("rannnnnn");
            setRemoteS(s => [...s, stream])
        });

        call.on('error', err => {
            console.log(err);
        })
    }

    const getMediaStrams = () => {
        navigator.getUserMedia({video: true, audio: true}, stream => {
            setLocalS(stream)
        })
    }


    useEffect(() => {
        localV.current.srcObject = localS

        if (localS) {

            peer.on("call", call => {
                console.log(localS);
                call.answer(localS)
                call.on('stream', function(stream) {
                    setRemoteS(s => [...s, stream])
                });
            })
        }
    }, [localS])

    // useEffect(() => {
    //     remoteV.current.srcObject = remoteS
    // }, [remoteS])

    return (
        <div className="test">
            my id : {MyID}
            <div className="call">
                <input type="text" placeholder="Calling id" value={ID} 
                    onChange={e => setID(e.target.value)}
                />
                <button className="call btn btn-danger" onClick={() => connectWithPeer(ID)}>Call</button>
            </div>

            <div className="row">
                <div className="local col">
                    <p></p>
                    <p>local</p>
                    <video autoPlay muted ref={localV}> </video>
                </div>
                <div className="remote col">
                    <p></p>
                    <p>local</p>
                    {remoteS.map(stream => (
                        <Video stream={stream}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

const Video = ({ stream }) => {
    const localVideo = useRef()
  
    // localVideo.current is null on first render
    // localVideo.current.srcObject = stream;
  
    useEffect(() => {
      // Let's update the srcObject only after the ref has been set
      // and then every time the stream prop updates
      if (localVideo.current) localVideo.current.srcObject = stream;
    }, [stream, localVideo]);
  
    return (<video style={{ height: 100, width: 100 }} ref={localVideo} autoPlay muted />);
  };
 
export default Test;