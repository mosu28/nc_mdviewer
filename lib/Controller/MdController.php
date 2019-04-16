<?php
namespace OCA\MdViewer\Controller;

use Exception;

use OCP\IRequest;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

use OCA\MdViewer\Service\MdService;

class MdController extends Controller {
  private $service;
  private $userId;

  public function __construct(string $appName, IRequest $request, MdService $service, string $userId) {
    parent::__construct($appName, $request);
    $this->service = $service;
    $this->userId = $userId;
  }

  /**
   * @NoAdminRequired
   */
  public function index() {
    return new DataResponse($this->service->getAll());
  }

  /**
   * @NoAdminRequired
   */
  public function get($name) {
    return new DataResponse($this->service->getMd($name));
  }
}
