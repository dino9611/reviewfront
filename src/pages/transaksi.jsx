import React,{useState,useEffect} from 'react';
import { Table,CustomInput } from 'reactstrap';




const Transaksi=()=>{
    const [addimagefile,setimageadd]=useState({
        addImageFileName:'pilih foto..',
        addImageFile:undefined,
    })
    // useEffect(())


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

                </tbody>
                <tfoot>
                    <tr>
                        <td><input type='number' placeholder='userid' /></td>
                        <td><CustomInput type='file' label={addimagefile.addImageFileName} onChange={onAddImageFileChange}/></td>
                        <td><button className='btn btn-primary'> add foto</button></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tfoot>
            </Table>
        </div>
    )
}


export default Transaksi