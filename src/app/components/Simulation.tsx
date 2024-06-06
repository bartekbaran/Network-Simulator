import { useEffect, useState } from "react";
import { Circle } from "../interfaces/Circle";
import CircleComponent from "./CircleComponent";
import { Flow } from "../interfaces/Flow";
import FlowModal from "./modal/FlowModal";
import {Link} from "symulator/app/interfaces/Link";
import generateLink from "symulator/app/functions/generateLink";
import LinkModal from "symulator/app/components/modal/LinkModal";
import LinkComponent from "symulator/app/components/LineComponent";

function Simulation({
  _circles,
  _trafficGeneratorArray,
  _editCircle,
  _addFlow,
  _setLinks,
  _flowToBeEdited,
  _editFlow,
  _closeModal,
}: {
  _circles: Circle[];
  _trafficGeneratorArray: Circle[];
  _editCircle: any;
  _addFlow: any;
  _setLinks: any;
  _flowToBeEdited: Flow;
  _editFlow: boolean;
  _closeModal: any;
}) {
  const [circles, setCircles] = useState<Circle[]>([]);
  const [trafficGenerators, setTrafficGenerators] = useState<Circle[]>([]);

  const [links, setLinks] = useState<Link[]>([]);
  const [linkBeginning, setLinkBeginning] = useState<Circle>(null);
  const [selectedSource, setSelectedSource] = useState<Circle>(null);

  const [showFlowModal, setShowFlowModal] = useState<boolean>(false);
  const [showLinkModal, setShowLinkModal] = useState<boolean>(false);

  const [flowToBeEdited, setFlowToBeEdited] = useState<Flow>(null);
  const [linkToBeEdited, setLinkToBeEdited] = useState<Link>(null);

  const [isFlowEdit, setIsFlowEdit] = useState<boolean>(false);
  const [isLinkEdit, setIsLinkEdit] = useState<boolean>(false);

  useEffect(() => {
    setCircles(_circles);
  }, [_circles]);

  useEffect(() => {
    setTrafficGenerators(_trafficGeneratorArray);
  }, [_trafficGeneratorArray]);

  useEffect(() => {
    setFlowToBeEdited(_flowToBeEdited);
  }, [_flowToBeEdited]);

  useEffect(() => {
    setIsFlowEdit(_editFlow);
    setShowFlowModal(_editFlow);
  }, [_editFlow]);

  function addLink(selectedCircle: Circle) {
    if (linkBeginning === null) {
      setLinkBeginning(selectedCircle);
    } else if (linkBeginning === selectedCircle) {
      setLinkBeginning(null);
    } else {
      const indexOfDuplicate = links.findIndex(
        (link) =>
          (link.pairOfCircles.toCircle === selectedCircle || link.pairOfCircles.fromCircle === selectedCircle) &&
          (link.pairOfCircles.toCircle === linkBeginning || link.pairOfCircles.fromCircle === linkBeginning)
      );

      if (indexOfDuplicate !== -1) {
        const newLinks = [...links]
        newLinks.splice(indexOfDuplicate, 1);
        setLinks(newLinks);
        setLinkBeginning(null);
        return;
      }

      let newLink = generateLink(links.length + 1, linkBeginning, selectedCircle);
      setLinks([
        ...links,
        newLink
      ]);
      _setLinks([
        ...links,
        newLink
      ]);
      setLinkBeginning(null);
    }
  }

  function editCircle(draggedCircle: Circle) {
    _editCircle(draggedCircle);
    let updatedLinks = links.map((link) => link.pairOfCircles.toCircle.key === draggedCircle.key ?
        generateLink(link.id, link.pairOfCircles.fromCircle, draggedCircle) : link)
      .map((link) => link.pairOfCircles.fromCircle.key === draggedCircle.key ?
        generateLink(link.id, draggedCircle, link.pairOfCircles.toCircle) : link);
    setLinks(updatedLinks);
  }

  function addFlow(flow: Flow) {
    _addFlow(flow);
  }

  function editLink(newLink: Link) {
    let newLinks = links.map((link) => link.id === newLink.id ? newLink : link);
    setLinks(newLinks);
  }

  function updateSourceAndShowFlowModal(circle: Circle) {
    setSelectedSource(circle);
    setShowFlowModal(true);
  }

  function updateOpenedLineAndShowLineModal(link: Link) {
    setLinkToBeEdited(link);
    setShowLinkModal(true);
  }

  function handleCloseModal() {
    setShowFlowModal(false);
    setShowLinkModal(false);
    _closeModal();
    setIsFlowEdit(false);
    setIsLinkEdit(false);
    setFlowToBeEdited(null);
    setLinkToBeEdited(null);
  }

  return (
    <div id="simulation" className="relative" style={{ zIndex: "1" }}>
      {circles !== undefined &&
        circles.map((circle: Circle) => (
          <CircleComponent
            key={circle.key}
            isSelected={
              linkBeginning !== null && circle.key === linkBeginning.key
            }
            circle={circle}
            addLink={addLink}
            circleDragged={editCircle}
            setShowCreateFlowModal={updateSourceAndShowFlowModal}
          />
        ))}
      {links.map((link: Link) => (
        <LinkComponent
          key={link.id}
          link={link}
          openLinkModal={updateOpenedLineAndShowLineModal}
        />
      ))}
      <FlowModal
        isEdit={isFlowEdit}
        flowToBeEdited={flowToBeEdited}
        showModal={showFlowModal}
        handleCloseModal={handleCloseModal}
        selectedSource={selectedSource}
        trafficGeneratorArray={trafficGenerators}
        handleSave={addFlow}
      ></FlowModal>
      <LinkModal isEdit={isLinkEdit} linkToBeEdited={linkToBeEdited} showModal={showLinkModal} handleCloseModal={handleCloseModal} handleSave={editLink}></LinkModal>
    </div>
  );
}

export default Simulation;
