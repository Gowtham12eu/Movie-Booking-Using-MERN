const createMovieModel = require('../Module/MovieModule');
const { DB3 } = require('../config/ConnectingDataBase')();
const MovieModel = createMovieModel(DB3);
const createBookModel=require('../Module/bookDataModule');
const {DB4} =require('../config/ConnectingDataBase')();
const bookModel=createBookModel(DB4);
exports.movieData = async (req, res) => {
  try {
    const data = await MovieModel.find({});
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

exports.bookData=async(req,res)=>
{
  try{
    const data=await bookModel.find({});
    res.json({success:true,data});
  }catch(error)
  {
    res.status(500).json({success:false,error:err.message});
  }
}

