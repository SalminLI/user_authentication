import express from "express";
import fs from "fs";
import path from "path";
import csvParser from "csv-parse";
import iconv from "iconv-lite";

import connectDB from "./db/database.js";
import WordsModel from "./models/wordsmodel.js";

const app = express();
const PORT = 3500;
connectDB();

app.get('/groups', (req, res) => {
  WordsModel.distinct('group').then((err, data) => {
    res.set('Access-Control-Allow-Origin', '*');
    if(err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.get('/files', (req, res) => {
  fs.readdir ('./files/',(err,files) => {
    let f_name = '';
    let csv_files = [];
    for (let file of files) {
      if (path.extname(file) == '.csv') {
        f_name = path.basename(file, path.extname(file));
        csv_files.push(f_name);
      }
    }
    res.set('Access-Control-Allow-Origin', '*');
    res.send(csv_files);
  });
});

app.get('/load', (req, res) => {
  let group = req.query.group;
  let filePath = './files/' + group + '.csv';
  const buffer = fs.readFileSync(filePath);
  const data = iconv.decode(buffer,'win1251');
  csvParser(data,{delimiter:';'},async function(err, result) {
    if (!err) {
      let n1 = 0;
      let  tmp = {};
      let row = [];
      let json = [];
      const headers = ['group','w_id','word','trans'];
      for(var i=0; i<result.length; i++) {
        n1++;
        tmp = {};
        row = result[i];
        row.unshift(n1.toString());
        row.unshift(group);
        for(var j=0; j<headers.length; j++) {
          tmp[headers[j]] = row[j];
        }
        if (tmp['word']>'' && tmp['trans']>'') {
          json.push(tmp);
        }
      }
      res.set('Access-Control-Allow-Origin', '*'); 
      await WordsModel.deleteMany({group: group});
      if(err){
        res.send(err);
      } else {
        await WordsModel.insertMany(json,(err,data) => {
          if(err){
            res.send(err);
          } else {
            res.set('Access-Control-Allow-Origin', '*'); 
            let str = n1.toString() + ' rows <' + group + '> loaded.';
            res.send(str);
          }
        });
      }
    } else {
      let row = group + '.csv: ' + err.message;
      res.send(row);
    }
  });
});

app.get('/', (req, res) => {
  let group = req.query.group;
  res.set('Access-Control-Allow-Origin', '*'); 
  WordsModel.find({group: group}).then((err, data) => {
    if(err){
      res.send(err);
    } else {
      res.send(data);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
