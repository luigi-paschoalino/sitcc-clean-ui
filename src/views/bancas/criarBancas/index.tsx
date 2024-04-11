import DatePicker from "@mui/lab/DatePicker"
import { MenuItem, Select } from "@mui/material"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import InputLabel from "@mui/material/InputLabel"
import "date-fns"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Tfg } from "../../../@tfg/domain/entities/Tfg"
import { HttpServiceImpl } from "../../../infra/httpService"
import { TfgHttpGatewayImpl } from "../../../@tfg/infra/Tfg.gateway"
import { ListarTfgsQuery } from "../../../@tfg/application/ListarTfgs.query"
import { UsuarioHttpGatewayImpl } from "../../../@usuario/infra/gateways/Usuario.gateway"
import { ListarProfessoresQuery } from "../../../@usuario/application/ListarProfessores.query"

interface Professor {
    id: string
    nome: string
}

interface InputValues {
    data: Date
}

//HTTP Service
const httpService = new HttpServiceImpl()
const tfgGateway = new TfgHttpGatewayImpl(httpService)
const usuarioGateway = new UsuarioHttpGatewayImpl(httpService)
const listarTfgs = new ListarTfgsQuery(tfgGateway)
const listarProfessores = new ListarProfessoresQuery(usuarioGateway)

export default function CriarBanca() {
    const [professores, setProfessores] = useState<Professor[]>([])
    const [professorBanca, setProfessorBanca] = useState<Professor | null>(null)
    const [segundoProfessorBanca, setSegundoProfessorBanca] =
        useState<Professor | null>(null)
    const [dataDefesa, setDataDefesa] = useState<Date>(new Date())
    const [status, setStatus] = useState<boolean | string>(true)
    const [inputValues, setInputValues] = useState<InputValues>({
        data: new Date(),
    })
    const [tfgs, setTfgs] = useState<Tfg[]>([])

    const navigate = useNavigate()

    return (
        <Container component="main" maxWidth="xs">
            <div className="mt-3 mt-md-5">
                <div className="text-center">
                    <h2 className="text-center pt-3 pb-5">Registro de banca</h2>
                    <div className="imc_div">
                        <InputLabel>
                            Selecione os professores que farão parte da banca
                        </InputLabel>
                        <Select
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Professor Orientador"
                            // onChange={handleChangeOrientador}
                        >
                            {professores.map((professor) => (
                                <MenuItem value={professor.id} />
                            ))}
                        </Select>
                    </div>
                    <div className="imc_div">
                        <Select
                            className={"mt-3"}
                            labelId="label-tipo-usuario"
                            placeholder="Professor Coorientador"
                            // onChange={handleChangeCoorientador}
                        >
                            {professores.map((professor) => (
                                <MenuItem value={professor.id} />
                            ))}
                        </Select>
                    </div>
                    <div
                        className={"mt-3"}
                        style={{
                            display: "flex",
                            justifyItems: "center",
                            alignItems: "center",
                        }}
                    >
                        <DatePicker
                            className="mt-2"
                            autoOk
                            required
                            fullWidth
                            variant="inline"
                            inputVariant="outlined"
                            label="Data"
                            value={dataDefesa}
                            onChange={(newValue) => {
                                setDataDefesa(newValue as Date)
                            }}
                        />
                    </div>
                </div>
                <Button
                    type="button"
                    variant="contained"
                    fullWidth
                    color="primary"
                    size="large"
                    className="mb-3 mb-md-4 mt-4 backgroundcolor2"
                    // onClick={() => onSubmit()}
                >
                    Marcar
                </Button>
            </div>
        </Container>
    )
}
