import React, { useState } from 'react'
import Navbar from './components/navbar'
import { usePDF } from 'react-to-pdf';

export default function App() {
  const [bin_lists, setBinLists] = useState([])
  const [from_date, setFromDate] = useState("")
  const [to_date, setToDate] = useState("")
  const { toPDF, targetRef } = usePDF({filename: 'รายงานการทิ้งขยะ.pdf'});

  const _handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch(`http://102.211.232.82:34899/smart-bin/getFullBinBy?from_date=${from_date}&to_date=${to_date}`)
    const data = await res.json()
    setBinLists(data)
    console.log(data);
  }

  const DataTable = () => {
    return (<>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                #
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                วันที่
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold">
                ปริมาณ
              </th>
              <th scope="col" className="px-6 py-3 text-center font-bold w-48">
                จำนวนครั้งที่เต็ม
              </th>
            </tr>
          </thead>
          <tbody>
            {
              bin_lists.map((item, idx) => (
                <tr key={idx} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                    {idx + 1}
                  </th>
                  <td className="px-6 py-4 text-center">
                    {item.date}
                  </td>
                  <td className="px-6 py-4 text-end">
                    {item.volume}kg.(กก.)
                  </td>
                  <td className="px-6 py-4 text-end">
                    {item.count}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </div>
    </>)
  }


  return (
    <>
      <Navbar />
      <div className="container mt-24 mx-auto md:px-48 font-bold">
        <h3 className="text-2xl">ระบบแสดงรายงานการทิ้งขยะ</h3>
        <hr />
        <form className='mt-3 w-full flex items-center gap-3' onSubmit={_handleSubmit} method="get">
          <span> ตั้งแต่วันที่ </span>
          <input onChange={e => setFromDate(e.target.value)} className='border-0' type="date" name="from_date" id="from_date" />
          <span> ถึงวันที่ </span>
          <input onChange={e => setToDate(e.target.value)} className='border-0' type="date" name="to_date" id="to_date" />
          <button className='bg-green-400 text-white px-4 py-2 rounded-md ms-auto hover:shadow-md hover:bg-green-500 duration-200' type="submit">ค้นหา</button>
          <button onClick={() => toPDF()} className='bg-red-400 text-white px-4 py-2 rounded-md hover:shadow-md hover:bg-red-500 duration-200' type="button">PDF</button>
        </form>

        <div className='px-16 py-16' ref={targetRef}>
          <h3 className='text-lg text-center'>รายงานการทิ้งขยะ</h3>
          <p className='text-center w-full'>
            {from_date ? 'ตั้งแต่วันที่ ' + from_date + ' ' : ''}
            {to_date ? 'ถึงวันที่ ' + to_date + ' ' : ''}
          </p>
          <DataTable />
        </div>

      </div>
    </>
  )
}
