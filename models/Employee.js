const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // Basic email regex validation
    },
    password: { type: String, required: true },
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      default: function () {
        return this._id;
      },
    },
    id: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      default: function () {
        return this._id;
      },
    },
    locationId: {
      type: String,
      required: true,
    },
    organizationId: {
      type: String,
      required: true,
    },
    partnerId: {
      type: String,
      required: true,
    },
    payrollId: {
      type: String,
      required: true,
    },
    employerPayrollId: {
      type: String,
      required: true,
    },
    accessRole: {
      name: {
        type: String,
        required: true,
      },
      permissions: [
        {
          type: String,
          required: true,
        },
      ],
    },
    role: {
      name: {
        type: String,
        required: true,
      },
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
