import ContrastMaker from "./ContrastMaker.js"
import EDRReader from "./EDRReader.js"
import EventBufferParser from "./EventBufferParser.js"
import FilteredImageInitializer from "./FilteredImageInitializer.js"
import FilteredImageMaker from "./FilteredImageMaker.js"
import FilteredNeutronEventMaker from "./FilteredNeutronEventMaker.js"
import FilteredTOFHistogramInitializer from "./FilteredTOFHistogramInitializer.js"
import FilteredTOFHistogramMaker from "./FilteredTOFHistogramMaker.js"
import FilteredTOFImageInitializer from "./FilteredTOFImageInitializer.js"
import FilteredTOFImageMaker from "./FilteredTOFImageMaker.js"
import ImageInitializer from "./ImageInitializer.js"
import ImageMaker from "./ImageMaker.js"
import NeutronEventMaker from "./NeutronEventMaker.js"
import NeutronRateMaker from "./NeutronRateMaker.js"
import PairedEventMaker from "./PairedEventMaker.js"
import PhaseMaker from "./PhaseMaker.js"
import Variables from "./Variables.js"


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
// initializers
variables.kickerPulseCount.assign(0)
variables.channel0Count.assign(0)
variables.channel1Count.assign(0)
variables.neutronCount.assign(0)
// parameters
variables.tofDifferenceMin.assign(-250)
variables.tofDifferenceMax.assign(250)
variables.miezeFrequencyInKilohertz.assign(10)
variables.moderatorSampleDistanceInMeters.assign(23.76)
variables.cameraLengthInMeters.assign(1.755)
variables.detectorHeightInMillimeters.assign(50)
variables.detectorWidthInMillimeters.assign(50)
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
variables.hdf5FilePath.assign('../../hdf5/mieze/106_mod.h5')
variables.directBeamHDF5FilePath.assign('../../hdf5/mieze/104_mod.h5')
variables.roiX.assign(400)
variables.roiY.assign(200)
variables.roiWidth.assign(200)
variables.roiHeight.assign(600)
variables.edrFilePath.assign('../../edr/20240000/rpmt_run106.edr')
variables.incidentAngleInDegrees.assign(1.3)



