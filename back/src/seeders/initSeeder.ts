import { programService } from '@app/domains/program/programService'
import { userService } from '@app/domains/user/userService'
import { Adnetwork, Campaign, Third, Tracking, User, Program } from '@app/models'
import { IConsole } from '@client/client'
import config from 'config'

export const run = async(_params, console:IConsole) => {
  try{
    
    
    const users = [
      {
        username: 'useradminket',
        password: 'ket#2025', 
        number: '000000',
        profile:{
          first_name: 'Kuepa', 
          last_name: ''
        },
        homes:[
          {
            app:"kuepa",
            roles: [],
            current: true,
          },
        ]
      },
    ]

    const programs = [
      {
        "name": "Inglés Intensivo",
        "description": "Programa enfocado en el aprendizaje acelerado del idioma inglés con clases diarias y práctica conversacional."
      },
      {
        "name": "Francés para Viajeros",
        "description": "Curso práctico diseñado para personas que necesitan desenvolverse en contextos de viaje y turismo en países francófonos."
      },
      {
        "name": "Tecnología y Programación",
        "description": "Formación en fundamentos de programación, desarrollo web y lógica computacional para principiantes."
      },
      {
        "name": "Marketing Digital",
        "description": "Programa que cubre estrategias de marketing en redes sociales, SEO, publicidad online y analítica digital."
      },
      {
        "name": "Habilidades Blandas y Liderazgo",
        "description": "Curso orientado al desarrollo de competencias como comunicación efectiva, trabajo en equipo y liderazgo."
      }
    ]

    for (const user of users) {
      const exists = await User.findOne({username: user.username}).lean()
      if(exists){
        user['_id'] = exists._id
        const update = await User.updateOne({_id: exists._id}, {$set: user})
        user['merge_homes'] = true
      } 
      await userService.upsert(user)
    }

    for (const program of programs) {
      const exists = await Program.findOne({ name: program.name }).lean()
      if (exists) {
        program['_id'] = exists._id
        const update = await Program.updateOne({ _id: exists._id }, { $set: program })
        program['merge_homes'] = true
      }
      await programService.upsert(program)
    }


  } catch (error) {
    console.log('error', error)
    return false
  }
  return true
}