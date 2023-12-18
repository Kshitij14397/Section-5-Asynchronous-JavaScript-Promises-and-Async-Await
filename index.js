const fs = require('fs');
const { allowedNodeEnvironmentFlags } = require('process');
const superagent = require('superagent');

const readFilePro = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject('Cannot read from this file!');
      resolve(data);
    });
  });
};

const writeFilePro = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) reject('Cannot write to this file!');
      resolve('Success!');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Pro = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    let imgs = all.map((res) => res.body.message);
    console.log(imgs);

    await writeFilePro(`dog-img.txt`, imgs.join('\n'));
    console.log(`Random dog image saved to file!`);
  } catch (err) {
    console.log(err);
    throw err;
  }
  return `2: Ready`;
};

(async () => {
  try {
    console.log(`1: Will get dog pics!`);
    let x = await getDogPic();
    console.log(x);
    console.log(`3: Done getting dog pics!`);
  } catch (err) {
    console.log(`ERROR`);
  }
})();

/*
console.log(`1: Will get dog pics!`);
getDogPic()
  .then((x) => {
    console.log(x);
    console.log(`3: Done getting dog pics!`);
  })
  .catch((err) => {
    console.log(`ERROR`);
  });
  */

/*readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    console.log(__dirname);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFilePro(`dog-img.txt`, res.body.message);
  })
  .then((data) => {
    console.log(data);
    console.log(`Random dog image saved to file!`);
  })
  .catch((err) => {
    console.log(err);
  });*/
