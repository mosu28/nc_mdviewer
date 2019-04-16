<?php
namespace OCA\MdViewer\Service;

use OCP\IConfig;
use OCP\Files\IRootFolder;
use OCP\Files\Folder;

class SettingsService {
  private $root;
  private $config;
  private $appName;
  private $userId;

  public function __construct(IRootFolder $root, IConfig $config, string $appName, string $userId) {
    $this->root = $root;
    $this->config = $config;
    $this->appName = $appName;
    $this->userId = $userId;
  }

  public function set($params) {
    $this->config->setAppValue($this->appName, 'settings', json_encode($params));
    return ['status' => 'ok', 'settings' => $params];
  }

  public function get() {
    $settings = $this->config->getAppValue($this->appName, 'settings');
    return ['status' => 'ok', 'settings' => json_decode($settings)];
  }
}