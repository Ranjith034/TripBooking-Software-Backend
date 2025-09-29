const Package = require("../../models/Admin/package.models")


const packegecontroller = async (req,res) => {
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
     
      let packagevalues = await Package.create(data)
  
      res.json({
          packagevalues,
          created:"Successfully",
          message:"Package Created Successfully"
      })
  
  
      }
      catch(err){
          res.json({
              message:`${err}`
          })
      }
}

// GET all packages with area details
// const getPackages = async (req, res) => {
//   try {
//     const packages = await Package.find()
//       .populate("areas"); // this will fetch full area details instead of just IDs

//     res.json({
//       success: true,
//       message: "Packages fetched successfully",
//       data: packages
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: `Error fetching packages: ${err.message}`
//     });
//   }
// };

const getPackages = async (req, res) => {
  try {
    const packages = await Package.aggregate([
      {
        $lookup: {
          from: "areas",           // 👈 collection name in MongoDB
          localField: "areas",     // field in Package
          foreignField: "_id",     // field in Area
          as: "areaDetails"        // merged result
        }
      }
    ]);

    res.json({
      success: true,
      message: "Packages fetched successfully",
      data: packages
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error fetching packages: ${err.message}`
    });
  }
};


// GET one package by ID with area details
const getPackageById = async (req, res) => {
  try {
    const { _id } = req.query;

    const packageData = await Package.findById(_id)
      .populate("areas");

    if (!packageData) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({
      success: true,
      message: "Package fetched successfully",
      data: packageData
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error fetching package: ${err.message}`
    });
  }
};

// UPDATE package
// const updatePackage = async (req, res) => {
//   try {
//     const { _id } = req.query; // package id
//     const file = req.file;

//     let updateData = {
//       ...req.body
//     };

//     if (file) {
//       updateData.destination = file.destination;
//       updateData.originalname = file.originalname;
//       updateData.filename = file.filename;
//     }

//     const updatedPackage = await Package.findByIdAndUpdate(_id, updateData, {
//       new: true,        // return updated doc
//       runValidators: true // validate before update
//     }).populate("areas"); // also return area details if needed

//     if (!updatedPackage) {
//       return res.status(404).json({
//         success: false,
//         message: "Package not found"
//       });
//     }

//     res.json({
//       success: true,
//       message: "Package updated successfully",
//       data: updatedPackage
//     });

//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       message: `Error updating package: ${err.message}`
//     });
//   }
// };

const updatePackage = async (req, res) => {
  try {
    const { _id } = req.query; // package id
    const file = req.file;

    let updateData = {
      ...req.body
    };

    // If areas are sent as objects, convert them to their IDs
    if (updateData.areas && Array.isArray(updateData.areas)) {
      updateData.areas = updateData.areas.map(area => {
        // if it's already a string id, keep it
        if (typeof area === "string") return area;
        // if it's an object, extract _id
        return area._id;
      });
    }

    if (file) {
      updateData.destination = file.destination;
      updateData.originalname = file.originalname;
      updateData.filename = file.filename;
    }

    const updatedPackage = await Package.findByIdAndUpdate(_id, updateData, {
      new: true,
      runValidators: true
    }).populate("areas");

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({
      success: true,
      message: "Package updated successfully",
      data: updatedPackage
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error updating package: ${err.message}`
    });
  }
};



// DELETE package
const deletePackage = async (req, res) => {
  try {
    const { _id } = req.query;

    const deletedPackage = await Package.findByIdAndDelete(_id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        message: "Package not found"
      });
    }

    res.json({
      success: true,
      message: "Package deleted successfully",
      data: deletedPackage
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: `Error deleting package: ${err.message}`
    });
  }
};




module.exports = {packegecontroller,getPackages,getPackageById,updatePackage,deletePackage}