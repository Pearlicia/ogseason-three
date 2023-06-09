import React, { useEffect, useState } from 'react';
import { withSSRContext } from 'aws-amplify';
import { listFiles } from '../graphql/queries';
import { Storage } from "aws-amplify";
import Button from 'react-bootstrap/Button';



const AllFiles = () => {
    const [ files, setFiles ] = useState([]);
    const getFiles = async () => {
        const SSR = withSSRContext();
        const { data } = await SSR.API.graphql({
            query: listFiles,
            authMode: 'AMAZON_COGNITO_USER_POOLS'
        });

        setFiles(data.listFiles.items);
        console.log( data.listFiles.items )
    }

    useEffect(() => {
        getFiles();
    }, [])

    const downloadFile = async (name) => {
        const signedURL = await Storage.get(name, {expires: 60 });
        window.location.href = signedURL;
    }
   

    return (
        <div>
            {
                files.map(file =>
                    <div key={file.id} >
                         <h2>
                            {file.name}
                        </h2>
                                    
                        <Button
                            onClick={() => downloadFile(file.name)}
                        >
                            Download
                        </Button>
                    </div>
                )
            }
        </div>
    );
};

export default AllFiles;




