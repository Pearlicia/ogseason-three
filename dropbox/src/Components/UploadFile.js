import React, { useState } from 'react';
import { Storage, API } from 'aws-amplify';
import { createFile } from "../graphql/mutations";
import awsConfig from "../aws-exports";

const UploadFile = () => {
    const [file, setFile] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const uploadedFile = await Storage.put(file.name, file);

            const fileNew = {
                query: createFile,
                variables: {
                    input: {
                        name: file.name,
                        file: {
                            bucket: awsConfig.aws_user_files_s3_bucket,
                            region: awsConfig.aws_user_files_s3_bucket_region,
                            key: uploadedFile.key
                        }
                    }
                },
                authMode: 'AMAZON_COGNITO_USER_POOLS'
            }

            const newFile = await API.graphql(fileNew);
            console.log(newFile)
        } catch (e) {
            alert(e);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2>Upload File</h2>
            <label>
                <input
                    type="file"
                    name="file"
                    onChange={e => setFile(e.target.files[0])}
                />
                <input type="submit" value="Upload" />
            </label>
        </form>
    );
};

export default UploadFile;









// import React, { useState } from 'react';
// import { Storage, API } from 'aws-amplify';
// import { createFile } from "../graphql/mutations";
// import { createFolder } from "../graphql/mutations";
// import awsConfig from "../aws-exports";

// const UploadFile = () => {
//     const [file, setFile] = useState("");
//     const [folderName, setFolderName] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const folder = await API.graphql({
//                 query: createFolder,
//                 variables: {
//                     input: {
//                         name: folderName
//                     }
//                 },
//                 authMode: 'AMAZON_COGNITO_USER_POOLS'
//             });
//             console.log("Folder created:", folder);

//             const uploadedFile = await Storage.put(`${folderName}/${file.name}`, file);

//             const fileNew = {
//                 query: createFile,
//                 variables: {
//                     input: {
//                         name: file.name,
//                         file: {
//                             bucket: awsConfig.aws_user_files_s3_bucket,
//                             region: awsConfig.aws_user_files_s3_bucket_region,
//                             key: uploadedFile.key
//                         }
//                     }
//                 },
//                 authMode: 'AMAZON_COGNITO_USER_POOLS'
//             }

//             const newFile = await API.graphql(fileNew);
//             console.log("File uploaded:", newFile)
//         } catch (e) {
//             alert(e);
//         }
//     }

//     return (
//         <form onSubmit={handleSubmit}>
//             <h2>Upload File</h2>
//             <label>
//                 Folder name:
//                 <input
//                     type="text"
//                     name="folderName"
//                     value={folderName}
//                     onChange={e => setFolderName(e.target.value)}
//                 />
//             </label>
//             <br />
//             <label>
//                 File:
//                 <input
//                     type="file"
//                     name="file"
//                     onChange={e => setFile(e.target.files[0])}
//                 />
//             </label>
//             <br />
//             <input type="submit" value="Upload" />
//         </form>
//     );
// };

// export default UploadFile;

