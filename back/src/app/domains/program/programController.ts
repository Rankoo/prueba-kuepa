// @import_dependencies
import { Request, Response } from 'express'

// @import_services
import { ProgramService } from './programService'

// @import_models
import {  } from "@app/models"

// @import_utilities
import { responseUtility } from "@core/utilities/responseUtility"

// @import_types

class ProgramController {
  

  
  private service = new ProgramService()

  constructor () {}

  public list = async(req: Request, res: Response) => {
    const _params = req._data()
    const response = await this.service.list(_params)
    return responseUtility.build(res, response)
  }

  public test = async(req: Request, res: Response) => {
    const _params = req._data()
    const response = await this.service.test(_params)
    return responseUtility.build(res, response)
  }
  
}


export const programController = new ProgramController()
export { ProgramController }