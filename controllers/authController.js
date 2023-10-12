import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import JWT from "jsonwebtoken";

export const registerController = async (req, res) => {
    function isCompanyDomain(workemailaddress) {
        const [username, domain] = workemailaddress.split('@');
        return domain === 'xenxcel.com';
      }
      try {
        const {firstname, lastname, companyname, workemailaddress, password} = req.body;
        // validation
        if(!firstname){
            return res.send({message: "First Name is required."})
        }
        if(!lastname){
            return res.send({message: "Last Name is required."})
        }
        if(!companyname){
            return res.send({message: "Company Name is required."})
        }
        if(!workemailaddress){
            return res.send({message: "Work Email address is required."})
        }
        if(!isCompanyDomain(workemailaddress)){
            return res.send({message: "Work Email Invalid"})
        }
        if(!password){
            return res.send({message: "Password is required."})
        }

        const existingUser = await userModel.findOne({workemailaddress})

        // existing user
        if(existingUser){
            return res.status(200).send({
                success: false,
                message: "Already Register please login",
            })
        }

        // register user
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({firstname, lastname, companyname, workemailaddress, password:hashedPassword}).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registration",
            error,
        });
    }
};

//login
export const loginController = async (req,res) => {
    try {
        const { workemailaddress, password} = req.body;
        // validation
        if(!workemailaddress || !password){
            return res.status(404).send({
                success: "Invalid email or password",
            })
        }
        // check user
        const user = await userModel.findOne({workemailaddress});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Email is not registered",
            });
        }
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(200).send({
                success: false,
                message: "Invalid Password",
            });
        }
        // token
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn:"7d",});
        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user:{
                firstname: user.firstname,
                lastname: user.lastname,
                companyname: user.companyname,
                workemailaddress: user.workemailaddress,
                password:user.password
            },
            token,
        });
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Error in Login",
            error,
        })
    }
};

// test controller
export const testController = (req,res) => {
    res.send("Protected Route");
};