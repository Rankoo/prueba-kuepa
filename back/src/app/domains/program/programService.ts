// @import_dependencies

// @import_services

// @import_models
import { Program } from "@app/models"

// @import_utilities
import { responseUtility } from "@core/utilities/responseUtility"

// @import_types


class ProgramService {
  
  
  constructor () {}

  public async list(_params) {
    try {
      const where: any = {}

      let programs = await Program.find(where)
        .sort({ created_at: -1 })
        .lean()
      
      return responseUtility.success({
        list: programs
      })
    } catch (error) {
      console.log('error', error)
    }
  }

  public async upsert(_params) {
    try {
      if (_params._id) {
        const program = await Program.findOneAndUpdate({ _id: _params._id }, {
          $set: _params
        }, { lean: true, new: true })

        return responseUtility.success({
          object: program
        })
      } else {
        const _program = await Program.create(_params)
        const program = _program.toObject()

        return responseUtility.success({
          object: _program.toObject()
        })
      }

    } catch (error) {
      console.log('error', error)
    }
  }
  
  public async test (_params) {
    try{
      
    } catch (error) {
      console.log('error', error)
    }
  }
}

export const programService = new ProgramService()
export { ProgramService }