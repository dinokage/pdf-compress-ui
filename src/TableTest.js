// import axios from 'axios'
import { useEffect, useState } from 'react';

// const fetchData = async () => {
//     const response = await axios.get('https://presign.dinokage.in/logs')
//     const data = await response.data

//     data.forEach(item => {
                
//     });
// }

export default function Table() {
    const [logs, setLogs] = useState([])
    useEffect(() => {
        fetch("https://presign.dinokage.in/logs")
          .then(response => response.json())
          .then(json => setLogs(json))
      }, [])

    return (
        

<div class="relative overflow-x-auto overflow-y-scroll">
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Time taken
                </th>
                <th scope="col" class="px-6 py-3">
                    Initial size
                </th>
                <th scope="col" class="px-6 py-3">
                    Final size
                </th>
                <th scope="col" class="px-6 py-3">
                    Original file
                </th>
                <th scope="col" class="px-6 py-3">
                    Compressed File
                </th>
            </tr>
        </thead>
        <tbody>
        {logs.map(item => {
       return (<tr class="bg-white dark:bg-gray-800">
        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {item.name}
        </th>
        <td class="px-6 py-4">
            {item.elapsed}
        </td>
        <td class="px-6 py-4">
            {item.initialSize}
        </td>
        <td class="px-6 py-4">
            {item.finalSize}
        </td>
        <td class="px-6 py-4">
        <a href={item.initialURL}>Original</a>
        </td>
        <td class="px-6 py-4">
            <a href={item.url}>Compressed</a>
        </td>
    </tr>)
        
    })}
        </tbody>
    </table>
</div>

    )
}