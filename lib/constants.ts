import { vehicleTypeValues } from "./db/schema/app";

const constants = {
  APP_NAME: "Carwash App",
  PAGE_SIZE: 10,
  VEHICLE_TYPE_NAMES: {
    car: "Carro",
    truck: "Camioneta",
    motorcycle: "Moto",
  } as Record<(typeof vehicleTypeValues)[number], string>,
};

export default constants;
