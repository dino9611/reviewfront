import React,{useState,useEffect,useRef} from 'react';
import { Table,CustomInput } from 'reactstrap';
import Axios from 'axios'
import { ApiUrl, ApiUrlimage } from '../support/apiurl';



const Transaksi=()=>{
    const [addimagefile,setimageadd]=useState({
        addImageFileName:'pilih foto..',
        addImageFile:undefined,
    })
    const [data,setdata]=useState(null)
    const [datainput]=useState({
        userid:useRef()
    })
    useEffect(()=>{
        const fetchdata= async()=>{
            try {
                const fahkran=await Axios.get(`${ApiUrl}product/gettrans`)
                // datainput.userid.current.focus()
                setdata(fahkran.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    },[])

    const adddata=()=>{
        var formdata=new FormData()
        console.log(datainput.userid.current.value)
        const {userid}=datainput
        const data={
          userid:userid.current.value,
        }
        // const token=localStorage.getItem('token')
        var Headers={
          headers:
          {
              'Content-Type':'multipart/form-data',
            //   'Authorization':`Bearer ${token}`
          },
          
        }
        formdata.append('image',addimagefile.addImageFile)
        formdata.append('data',JSON.stringify(data))
        Axios.post(`${ApiUrl}product/posttrans`,formdata,{
            headers:{
                'Content-Type':'multipart/form-data',
                //   'Authorization':`Bearer ${token}`
            },
        })
        .then((res)=>{
            setdata(res.data)
        }).catch((err)=>{
          console.log(err)
        })
      }



    const onAddImageFileChange=(event)=>{
        // console.log(document.getElementById('addImagePost').files[0])
        console.log(event.target.files[0])
        var file=event.target.files[0]
        if(file){
            setimageadd({...addimagefile,addImageFileName:file.name,addImageFile:event.target.files[0]})
        }else{
            setimageadd({...addimagefile,addImageFileName:'pilih foto',addImageFile:undefined})
        }
    }
    const renderdata=()=>{
        if(data===null){
            return (
                <tr>
                    <td>loading...</td>
                </tr>
            )
        }else if(data.length===0){
            return(
                <tr>
                    <td>tidak ada data...</td>
                </tr>
            )
        }else{
            return data.map((val,index)=>{
                return (
                    <tr key={index}>
                        <td>{index+1}</td>
                        <td>{val.userid}</td>
                        <td>{val.status}</td>
                        <td>{val.tanggal}</td>
                        <td><img src={`${ApiUrlimage+val.paymentimg}`} alt={val.image} height='100px'/></td>
                    </tr>
                )
            })
        }
    }


    return(
        <div>
            <Table striped bordered>
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>userid</th>
                        <th>status</th>
                        <th>tanggal</th>
                        <th>foto</th>
                    </tr>
                </thead>
                <tbody>
                    {renderdata()}
                </tbody>
                <tfoot>
                    <tr>
                        <td></td>
                        <td><input type='number' placeholder='userid' ref={datainput.userid} /></td>
                        <td><CustomInput id='foto' type='file' label={addimagefile.addImageFileName} onChange={onAddImageFileChange}/></td>
                        <td><button onClick={adddata} className='btn btn-primary'> add foto</button></td>
                        <td></td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}


export default Transaksi