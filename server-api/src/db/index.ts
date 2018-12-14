import { Pool, Client } from 'pg';

// pools will use environment variables
// for connection information
const pool = new Pool();

// pool.query('SELECT NOW()', (err, res) => {
//   console.log('plain');
//   console.log({ err: err, res: res });
//   console.log({ 'res.rows': res.rows });
//   // pool.end();
// });

// // you can also use async/await
// async function test2() {
//   try {
//     const res2 = await pool.query('SELECT NOW()');
//     console.log({ res2: res2, 'res2.rows': res2.rows });
//     console.log({});
//     // await pool.end();
//   } catch (err) {
//     console.log(err);
//   }
// }
// test2();

// // clients will also use environment variables
// // for connection information
// test3();

// test4();

export default {
  query: (text: string, params: any) => pool.query(text, params)
};

// async function test3() {
//   try {
//     const client = new Client();
//     const res3 = await client.connect();
//     console.log({ 'res3': res3, 'client': client});
//     return client;
//   } catch (err) {
//     console.log(err);
//     console.log({'err': err});
//   }
// }

// async function test4() {
//   try {
//     const client = new Client();
//     const res4 = await client.query('SELECT NOW()');
//     console.log({ res4: res4, 'res4.rows': res4.rows });
//     await client.end();
//   } catch (err) {
//     console.log(err);
//   }
// }
