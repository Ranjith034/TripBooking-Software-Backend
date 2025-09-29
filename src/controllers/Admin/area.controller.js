const Area = require("../../models/Admin/area.models")
const fs = require('fs');
const path = require('path');

// post area data

const areacontroller = async (req,res) => {
    try{

     const file = req.file
     const data = {
        ...req.body
     }
    
    if(file){
               data.destination = file.destination
                data.originalname = file.originalname
                data.filename = file.filename
    }
   
    let areavalues = await Area.create(data)

    res.json({
        areavalues,
        created:"Successfully",
        message:"Area Created Successfully"
    })


    }
    catch(err){
        res.json({
            message:`${err}`
        })
    }
}


//update area data

const updateAreaController = async (req, res) => {
    try {
        const { _id } = req.query;
        const file = req.file;

        // Get the existing area document
        const existingArea = await Area.findById(_id);

        if (!existingArea) {
            return res.status(404).json({
                message: "Area not found"
            });
        }

        const updatedData = {
            ...req.body
        };

        if (file) {
            // Construct full path to old file
            const oldFilePath = existingArea.destination
                ? path.join(existingArea.destination, existingArea.filename)
                : null;

            // Delete old file if it exists
            if (oldFilePath && fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath);  // synchronous delete
            }

            // Add new file info to update data
            updatedData.destination = file.destination;
            updatedData.originalname = file.originalname;
            updatedData.filename = file.filename;
        }

        // Update the area document
        const updatedArea = await Area.findByIdAndUpdate(_id, updatedData, {
            new: true,
            runValidators: true
        });

        res.json({
            updatedArea,
            updated: "Successfully",
            message: "Area Updated Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: `Error updating area: ${err.message}`
        });
    }
};



const getAllArea = async (req, res) => {
    try {
        const { _id } = req.query;

        // Check if _id exists and is not empty
        if (_id && _id.trim() !== "") {
            const area = await Area.findById(_id);
            if (!area) {
                return res.status(404).json({ message: 'Area not found' });
            }
            return res.json({
                area,
                message: "Area fetched successfully"
            });
        }

        // If no _id, fetch all areas
        const allAreas = await Area.find();

        if (!allAreas || allAreas.length === 0) {
            return res.json({ message: 'No data found' });
        }

        res.json({
            areas: allAreas,
            message: "Areas fetched successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: `Error fetching area(s): ${err.message}`
        });
    }
};

const deletearea = async (req,res) => {
    try{
        const {_id} = req.query
        const delarea = await Area.findByIdAndDelete(_id)
        if(!delarea) return res.json({message:"id not found"})
            res.json({
             delarea,
             message:"Delete Area Successfully"
            })
    }
    catch(err){
        res.json({message:`${err}`})
    }
}






module.exports = {areacontroller,updateAreaController,getAllArea,deletearea}