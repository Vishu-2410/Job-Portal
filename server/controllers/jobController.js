import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import ErrorHandler from "../middlewares/error.js";
import { Job } from "../models/jobSchema.js";

//Get all active jobs
export const getALLJobs = catchAsyncError(async (req, res, next) => {
  //which job are not expired by the employers that all job provide us
  const jobs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    jobs,
  });

});

//Post a new Job
export const postJob = catchAsyncError(async (req, res, next) => {
  //to get user role
  const { role } = req.user;
  // const role=req.user.role;

  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Skeeker is not allowed to access this resources!", 400));
  }
  const { title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo
  } = req.body;


  //Validation checks
  if (!title || !description || !category || !country || !city || !location) {
    return next(new ErrorHandler("Please Provide full job detais", 400));
  }
  if ((!salaryFrom || !salaryTo) && !fixedSalary) {
    return next(
      new ErrorHandler("Please either provide fixed salary or ranged salary!")
    );
  }
  // only one type of salary provide us
  if (salaryFrom && salaryTo && fixedSalary) {
    return next(
      new ErrorHandler("Cannot enter fixed salary and renged salary together!")
    );
  }

  // who is posted this job
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    postedBy
  });

  // message to user
  res.status(200).json({
    success: true,
    message: "Job posted successfully!",
    job,
  });

});

// Get jobs posted by the logged-in user
export const getmyJobs = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;
  if (role === "Job Seeker") {
    return next(new ErrorHandler("Job Skeeker is not allowed to access this resources!", 400));
  }

  const myjobs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myjobs,
  });

});

// Update a job by ID
export const updateJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.body;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Skeeker is not allowed to access this resources.", 400)
    );
  }

  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(
      new ErrorHandler("Oops, Job not found.", 400)
    );
  }
  // to store job
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  })
  res.status(200).json({
    success: true,
    job,
    message: "Job Updated Successfully !"
  });
});

// Delete a job by ID
export const deleteJob = catchAsyncError(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

//Get a single job by ID
export const getSingleJob = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});

