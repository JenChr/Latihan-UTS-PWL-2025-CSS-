"use client";
import { useEffect, useState } from 'react';
export default function ProdiPage() {
 const [Prodis, setProdis] = useState([]);
 const [kode, setKode ] = useState('');
 const [nama, setNama ] = useState('');
 const [kepala, setKepala ] = useState('');
 const [msg, setMsg ] = useState('');
 const [formVisible, setFormVisible] = useState(false);
 const [editId, setEditId] = useState(null);
 const fetchProdis = async () => {
 const res = await fetch('/api/prodi');
 const data = await res.json();
 setProdis(data);
 };
 useEffect(() => {
 fetchProdis();
 }, []);

 const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch('/api/prodi', {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: editId, kode, nama, kepala }),
    });
    if (res.ok) {
    setMsg('Berhasil disimpan!');
    setKode('');
    setNama('');
    setKepala('');
    setEditId(null);
    setFormVisible(false);
    fetchProdis(); // refresh data
    } else {
    setMsg('Gagal menyimpan data');
    }
    };

    const handleEdit = (item) => {
    setKode(item.kode);
    setNama(item.nama);
    setKepala(item.kepala);
    setEditId(item.id);
    setFormVisible(true);
    };

    const handleDelete = async (id) => {
        if (!confirm('Yakin hapus data ini?')) return;
        await fetch('/api/Prodi', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
        });
        fetchProdis();
        };
        return (
        <div>
        <button
        onClick={() => setFormVisible(!formVisible)}>
        {formVisible ? 'Tutup Form' : 'Tambah Prodi'}
        </button>
       
        {formVisible && (
        <form onSubmit={handleSubmit}>
        <div>
        <input
        type="text"
        value={kode}
        onChange={(e) => setKode(e.target.value)}
        placeholder="Masukkan Kode"
        required
        />
        </div>

        <div>
 <input
 type="text"
 value={nama}
 onChange={(e) => setNama(e.target.value)}
 placeholder="Masukkan Nama Prodi"
 required
 />
 </div>

<div>
    <input
      type="text"
      value={kepala}
      onChange={(e) => setKepala(e.target.value)}
      placeholder="Masukkan Kepala"
      required
    />
  </div>

 <button type="submit">
 Simpan
 </button>
 <p>{msg}</p>
 </form>
 )}
 <br></br>
 <table border="1">
 <thead>
 <tr>
 <th>No</th>
 <th>Kode</th>
 <th>Nama Prodi</th>
 <th>Kepala</th>
 <th>Aksi</th>
 </tr>
 </thead>

 <tbody>
 {Prodis.map((item, index) => (
 <tr key={item.id}>
 <td>{index + 1}</td>
 <td>{item.kode}</td>
 <td>{item.nama}</td>
 <td>{item.kepala}</td>
 <td>
 <button onClick={() => handleEdit(item)}>Edit</button>
 <button onClick={() => handleDelete(item.id)}>Hapus</button>
 </td>
 </tr>
 ))}
 {Prodis.length === 0 && (
 <tr>
 <td colSpan="4">Belum ada data</td>
 </tr>
 )}
 </tbody>
 </table>
 </div>
 );
} 
