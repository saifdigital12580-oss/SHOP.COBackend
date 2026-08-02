const Wishlist = require("../Models/Wishlist");


// Add Wishlist

const AddWishlistController = async(req,res)=>{

    try{

        const {userId,productId} = req.body;

        const already = await Wishlist.findOne({
            userId,
            productId
        });

        if(already){

            return res.status(400).json({
                success:false,
                message:"Already in wishlist"
            });

        }

        const wishlist = await Wishlist.create({

            userId,
            productId

        });

        res.status(201).json({

            success:true,
            message:"Added to wishlist",
            wishlist

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// Get Wishlist

const GetWishlistController = async(req,res)=>{

    try{

        const {userId}=req.params;

        const wishlist = await Wishlist.find({

            userId

        }).populate("productId");

        res.json({

            success:true,
            wishlist

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};




// Remove Wishlist

const RemoveWishlistController = async(req,res)=>{

    try{

        const {id}=req.params;

        await Wishlist.findByIdAndDelete(id);

        res.json({

            success:true,
            message:"Removed"

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};

module.exports={

AddWishlistController,
GetWishlistController,
RemoveWishlistController

};