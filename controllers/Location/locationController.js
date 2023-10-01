import Location from "../../models/Location/Location.js";
import _throw from "../../utils/_throw.js";
import asyncHandler from "express-async-handler";

const locationController = {
    register: asyncHandler(async (req, res) => {
        try {
            const existingLocation = await Location.findOne({ locationCode: req.body.locationCode });
            if (existingLocation) {
                return _throw({
                    code: 400,
                    message: "Location code has been registered"
                })
            }
            const location = await Location.create({
                locationCode: req.body.locationCode,
                locationName: req.body.locationName,
                locationDetail: req.body.locationDetail,
                hotline: req.body.hotline,
                city: req.body.city,
            });
            await location.save();
            res.status(201).json({
                status: true,
                location
            })
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getOne: asyncHandler(async(req, res) => {
        try {
            const location = await Location.findById(req.params.id);
            if(!location){
                return _throw({
                    code: 404,
                    message: "Location not found"
                })
            }
            res.status(200).json({
                status: true,
                location
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    getAll: asyncHandler(async (req, res) => {
        try {
            const locations = await Location.find({});
            res.status(200).json({
                status: true,
                locations
            });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    update: asyncHandler(async (req, res) => {
        try {
            const location = await Location.findByIdAndUpdate(req.params.id);
            if (!location) {
                _throw({
                    code: 404,
                    message: 'Location not found'
                });
            }
            await location.save();
            res.status(200).json(location);
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    }),

    delete: asyncHandler(async (req, res) => {
        try {
            const location = await Location.findByIdAndDelete(req.params.id);
            if (!location) {
                _throw({
                    code: 404,
                    message: 'Location not found'
                });
            }
            res.status(200).json({ message: 'Location deleted' });
        } catch (error) {
            _throw({
                code: 400,
                message: error.message
            });
        }
    })
}

export default locationController;