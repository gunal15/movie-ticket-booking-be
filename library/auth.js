const mongoose = require("mongoose");
const bcrypt = require('bcryptjs')

const userSchema=mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    pic:{
        type:String,
        default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
    }
},{
    timestamps:true,
})

userSchema.methods.matchPassword=async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
})

const movieSchema = mongoose.Schema({
    movieName:{type:String,require:true},
    type:{type:String},
    trailer:{type:String},
    language:{type:String},
    releaseDate:{type:String},
    about:{type:String},
    cast:{type:Array},
    crew:{type:Array},
    poster:{type:String},
    categori:{type:String},
    duration:{type:String},
    like:{type:String}
})

const ticketSchema = mongoose.Schema({
    email:{type:String},
    movieName:{type:String},
    pic:{type:String},
    date:{type:String},
    time:{type:String},
    cinema:{type:String},
    place:{type:String},
    seat:{type:Array},
    srow:{type:String},
})

let User = mongoose.model("User",userSchema);
let Movie = mongoose.model("Movie",movieSchema);
let Ticket = mongoose.model("Ticket",ticketSchema)
module.exports={User,Movie,Ticket}