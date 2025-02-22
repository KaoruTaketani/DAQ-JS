import ContrastMaker from "./ContrastMaker.js"
import ContrastRatioMaker from "./ContrastRatioMaker.js"
import EDRReader from "./EDRReader.js"
import EnergyMaker from "./EnergyMaker.js"
import EventBufferParser from "./EventBufferParser.js"
import FilteredImageInitializer from "./FilteredImageInitializer.js"
import FilteredImageMaker from "./FilteredImageMaker.js"
import FilteredNeutronEventMaker from "./FilteredNeutronEventMaker.js"
import FilteredTOFHistogramInitializer from "./FilteredTOFHistogramInitializer.js"
import FilteredTOFHistogramMaker from "./FilteredTOFHistogramMaker.js"
import FilteredTOFImageInitializer from "./FilteredTOFImageInitializer.js"
import FilteredTOFImageMaker from "./FilteredTOFImageMaker.js"
import FourierEnergyMaker from "./FourierEnergyMaker.js"
import FourierTimeMaker from "./FourierTimeMaker.js"
import ImageInitializer from "./ImageInitializer.js"
import ImageMaker from "./ImageMaker.js"
import MomentumTransferMaker from "./MomentumTransferMaker.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import NeutronRateMaker from "./NeutronRateMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import PhaseMaker from "./PhaseMaker.js"
import PhaseShiftMaker from "./PhaseShiftMaker.js"
import ReflectivityMaker from "./ReflectivityMaker.js"
import TOFMaker from "./TOFMaker.js"
import Variables from "./Variables.js"
import VelocityMaker from "./VelocityMaker.js"
import WavelengthMaker from "./WavelengthMaker.js"


const variables = new Variables()

new EDRReader(variables)
new EventBufferParser(variables)
new PairedEventMaker(variables)
new NeutronEventMaker(variables)
new ImageInitializer(variables)
new ImageMaker(variables)
new FilteredNeutronEventMaker(variables)
new FilteredImageInitializer(variables)
new FilteredImageMaker(variables)
new FilteredTOFHistogramInitializer(variables)
new FilteredTOFHistogramMaker(variables)
new ContrastMaker(variables)
new PhaseMaker(variables)
new NeutronRateMaker(variables)
new FilteredTOFImageInitializer(variables)
new FilteredTOFImageMaker(variables)
new ContrastRatioMaker(variables)
new PhaseShiftMaker(variables)
new ReflectivityMaker(variables)
new TOFMaker(variables)
new VelocityMaker(variables)
new EnergyMaker(variables)
new WavelengthMaker(variables)
new FourierTimeMaker(variables)
new FourierEnergyMaker(variables)
new MomentumTransferMaker(variables)
// initializers
variables.kickerPulseCount.assign(0)
variables.channel0Count.assign(0)
variables.channel1Count.assign(0)
variables.neutronCount.assign(0)
// parameters
variables.tofDifferenceMin.assign(-250)
variables.tofDifferenceMax.assign(250)
variables.moderatorToSampleDistanceInMeters.assign(23.76)
variables.cameraLengthInMeters.assign(1.755)
variables.detectorHeightInMillimeters.assign(50)
variables.detectorWidthInMillimeters.assign(50)
variables.upstreamSlitToDownstreamSlitDistanceInMeters.assign(3.5)
variables.downstreamSlitToSampleDistanceInMeters.assign(0.3)
variables.upstreamSlitWidthInMillimeters.assign(2)
variables.downstreamSlitWidthInMillimeters.assign(2)
// must assign after distances are assigned
variables.miezeFrequencyInKilohertz.assign(10)
//
// parameters for 104
//
// variables.hdf5FilePath.assign('../../hdf5/mieze/104_mod.h5')
// variables.roiX.assign(480)
// variables.roiY.assign(250)
// variables.roiWidth.assign(150)
// variables.roiHeight.assign(450)
// variables.edrFilePath.assign('../../edr/20240000/rpmt_run104.edr')
//
// parameters for 106
//
// variables.hdf5FilePath.assign('../../hdf5/mieze/106_mod.h5')
// variables.directBeamHDF5FilePath.assign('../../hdf5/mieze/104_mod.h5')
// variables.roiX.assign(400)
// variables.roiY.assign(200)
// variables.roiWidth.assign(200)
// variables.roiHeight.assign(600)
// variables.edrFilePath.assign('../../edr/20240000/rpmt_run106.edr')
// variables.incidentAngleInDegrees.assign(1.3)
//
// parameters for online
//
variables.hdf5FilePath.assign('../../hdf5/mieze/a.h5')
variables.roiX.assign(200)
variables.roiY.assign(200)
variables.roiWidth.assign(600)
variables.roiHeight.assign(600)
variables.edrFilePath.assign('../online/edr/rpmt_run1.edr')




