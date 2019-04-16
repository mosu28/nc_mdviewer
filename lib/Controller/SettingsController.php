<?php
namespace OCA\MdViewer\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

use OCA\MdViewer\Service\SettingsService;

class SettingsController extends Controller {
  private $userId;

  public function __construct(string $appName, IRequest $request, SettingsService $service, string $userId) {
    parent::__construct($appName, $request);
    $this->request = $request;
    $this->service = $service;
    $this->userId = $userId;
  }

  /**
   * @NoAdminRequired
   */
  public function set() {
    $params = $this->request->getParams();
    return new DataResponse($this->service->set($params));
  }

  /**
   * @NoAdminRequired
   */
  public function get() {
    return new DataResponse($this->service->get());
  }
}
